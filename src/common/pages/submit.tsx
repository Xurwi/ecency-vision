import React, { Component } from "react";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { History, Location } from "history";

import isEqual from "react-fast-compare";

import { Form, FormControl, Button, Spinner } from "react-bootstrap";

import defaults from "../constants/defaults.json";

import {
  renderPostBody,
  setProxyBase,
  // @ts-ignore
} from "@esteemapp/esteem-render-helpers";
setProxyBase(defaults.imageServer);

import { AppState } from "../store";
import { Global } from "../store/global/types";
import { Account } from "../store/accounts/types";
import { TrendingTags } from "../store/trending-tags/types";
import { User } from "../store/users/types";
import { ActiveUser } from "../store/active-user/types";

import { hideIntro, toggleTheme } from "../store/global/index";
import { addAccount } from "../store/accounts/index";
import { fetchTrendingTags } from "../store/trending-tags";
import { setActiveUser, updateActiveUser } from "../store/active-user";
import { deleteUser } from "../store/users";

import Meta from "../components/meta";
import Theme from "../components/theme";
import Feedback from "../components/feedback";
import NavBar from "../components/navbar";
import FullHeight from "../components/full-height";
import EditorToolbar from "../components/editor-toolbar";
import TagSelector from "../components/tag-selector";
import Tag from "../components/tag";
import LoginRequired from "../components/login-required";
import { makePath as makePathEntry } from "../components/entry-link";
import { error, success } from "../components/feedback";

import { createPermlink, extractMetaData, makeJsonMetaData, makeCommentOptions } from "../helper/posting";

import { RewardType, comment, formatError } from "../api/operations";
import { getPost } from "../api/bridge";

import { _t } from "../i18n";

import _c from "../util/fix-class-names";
import * as ls from "../util/local-storage";

import { version } from "../../../package.json";

interface PostBase {
  title: string;
  tags: string[];
  body: string;
}

class PreviewContent extends Component<PostBase> {
  shouldComponentUpdate(nextProps: Readonly<PostBase>): boolean {
    return (
      !isEqual(this.props.title, nextProps.title) ||
      !isEqual(this.props.tags, nextProps.tags) ||
      !isEqual(this.props.body, nextProps.body)
    );
  }

  render() {
    const { title, tags, body } = this.props;

    return (
      <>
        <div className="preview-title">{title}</div>

        <div className="preview-tags">
          {tags.map((x) => {
            return (
              <span className="preview-tag" key={x}>
                <Tag type="span" {...this.props} tag={x}>
                  <span>{x}</span>
                </Tag>
              </span>
            );
          })}
        </div>

        <div className="preview-body markdown-view" dangerouslySetInnerHTML={{ __html: renderPostBody(body) }} />
      </>
    );
  }
}

interface Props {
  history: History;
  location: Location;
  global: Global;
  trendingTags: TrendingTags;
  users: User[];
  activeUser: ActiveUser | null;
  toggleTheme: () => void;
  addAccount: (data: Account) => void;
  fetchTrendingTags: () => void;
  setActiveUser: (username: string | null) => void;
  updateActiveUser: (data: Account) => void;
  deleteUser: (username: string) => void;
}

interface State extends PostBase {
  reward: RewardType;
  preview: PostBase;
  inProgress: boolean;
}

class SubmitPage extends Component<Props, State> {
  state: State = {
    title: "",
    tags: [],
    body: "",
    reward: "default",
    inProgress: false,
    preview: {
      title: "",
      tags: [],
      body: "",
    },
  };

  _updateTimer: any = null;
  _mounted: boolean = true;

  componentWillUnmount() {
    this._mounted = false;
  }

  stateSet = (obj: {}, cb: () => void = () => {}) => {
    if (this._mounted) {
      this.setState(obj, cb);
    }
  };

  componentDidMount = (): void => {
    this.loadLocalDraft();
  };

  loadLocalDraft = (): void => {
    const localDraft = ls.get("local_draft") as PostBase;
    if (!localDraft) {
      return;
    }

    const { title, tags, body } = localDraft;
    this.stateSet({ title, tags, body });
  };

  saveLocalDraft = (): void => {
    const { title, tags, body } = this.state;
    const localDraft: PostBase = { title, tags, body };
    ls.set("local_draft", localDraft);
  };

  titleChanged = (e: React.ChangeEvent<FormControl & HTMLInputElement>): void => {
    const { value: title } = e.target;
    this.stateSet({ title }, () => {
      this.updatePreview();
    });
  };

  tagsChanged = (tags: string[]): void => {
    this.stateSet({ tags }, () => {
      this.updatePreview();
    });
  };

  bodyChanged = (e: React.ChangeEvent<FormControl & HTMLInputElement>): void => {
    const { value: body } = e.target;
    this.stateSet({ body }, () => {
      this.updatePreview();
    });
  };

  rewardChanged = (e: React.ChangeEvent<FormControl & HTMLInputElement>): void => {
    const reward = e.target.value as RewardType;
    this.stateSet({ reward });
  };

  clear = (): void => {
    this.stateSet({ title: "", tags: [], body: "" });
    this.updatePreview();
  };

  updatePreview = (): void => {
    if (this._updateTimer) {
      clearTimeout(this._updateTimer);
      this._updateTimer = null;
    }

    this._updateTimer = setTimeout(() => {
      const { title, tags, body } = this.state;
      this.stateSet({ preview: { title, tags, body } });
      this.saveLocalDraft();
    }, 500);
  };

  publish = async (): Promise<void> => {
    const { activeUser, users, history } = this.props;
    const user = users.find((x) => x.username === activeUser?.username)!;

    this.stateSet({ inProgress: true });

    const { title, tags, body, reward } = this.state;
    let permlink = createPermlink(title);
    const { username: author } = user;

    // If permlink has already used create it again with random suffix
    let c;
    try {
      c = await getPost(author, permlink);
    } catch (e) {
      c = null;
    }

    if (c && c.author) {
      permlink = createPermlink(title, true);
    }

    const [parentPermlink] = tags;
    const meta = extractMetaData(body);
    const jsonMeta = makeJsonMetaData(meta, tags, version);
    const options = makeCommentOptions(author, permlink, reward);

    this.stateSet({ inProgress: true });
    comment(user, "", parentPermlink, permlink, title, body, jsonMeta, options)
      .then(() => {
        success(_t("submit.success"));
        
        const newLoc = makePathEntry(parentPermlink, author, permlink);
        history.push(newLoc);
      })
      .catch((e) => {
        error(formatError(e));
      })
      .finally(() => {
        this.stateSet({ inProgress: false });
      });
  };

  render() {
    const { title, tags, body, reward, preview, inProgress } = this.state;

    //  Meta config
    const metaProps = {
      title: "Create a post",
    };

    const canPublish = title.trim() !== "" && tags.length > 0 && tags.length <= 10 && body.trim() !== "";

    return (
      <>
        <Meta {...metaProps} />
        <FullHeight />
        <Theme {...this.props} />
        <Feedback />
        <NavBar {...this.props} />

        <div className="app-content submit-page">
          <div className="editor-side">
            <EditorToolbar />
            <div className="title-input">
              <Form.Control
                className="accepts-emoji"
                placeholder={_t("submit.title-placeholder")}
                autoFocus={true}
                value={title}
                onChange={this.titleChanged}
              />
            </div>
            <div className="tag-input">
              <TagSelector {...this.props} tags={tags} maxItem={10} onChange={this.tagsChanged} />
            </div>
            <div className="body-input">
              <Form.Control
                id="the-editor"
                className="accepts-emoji"
                as="textarea"
                placeholder={_t("submit.body-placeholder")}
                value={body}
                onChange={this.bodyChanged}
              />
            </div>
            <div className="bottom-toolbar">
              <div className="reward">
                <span>{_t("submit.reward")}</span>
                <Form.Control as="select" value={reward} onChange={this.rewardChanged}>
                  <option key="default">{_t("submit.reward-default")}</option>
                  <option key="sp">{_t("submit.reward-sp")}</option>
                  <option key="dp">{_t("submit.reward-dp")}</option>
                </Form.Control>
              </div>
              <Button variant="light" onClick={this.clear}>
                {_t("submit.clear")}
              </Button>
            </div>
          </div>
          <div className="flex-spacer" />
          <div className="preview-side">
            <div className="preview-header">
              <h2 className="preview-header-title">{_t("submit.preview")}</h2>
            </div>
            <PreviewContent {...this.props} {...preview} />
            <div className="bottom-toolbar">
              <span />
              <LoginRequired {...this.props}>
                <Button
                  className="d-inline-flex align-items-center"
                  onClick={this.publish}
                  disabled={!canPublish || inProgress}
                >
                  {inProgress && <Spinner animation="grow" variant="light" size="sm" style={{ marginRight: "6px" }} />}
                  {_t("submit.publish")}
                </Button>
              </LoginRequired>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  global: state.global,
  trendingTags: state.trendingTags,
  users: state.users,
  activeUser: state.activeUser,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      toggleTheme,
      hideIntro,
      addAccount,
      fetchTrendingTags,
      setActiveUser,
      updateActiveUser,
      deleteUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPage);
