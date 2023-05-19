import "@tencent/tea-component/dist/tea.css";
import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import PlayPanel from "../components/playPanel";
import { t, Trans } from '@tencent/tea-app/lib/i18n';
import { getUrlParameter } from '../util';
import {
  Layout,
  NavMenu,
  Form,
  Segment,
  Card,
  Copy,
  MonacoEditor,
  Text,
  Button,
  H3,
  H5,
  Icon,
  Justify,
} from "@tencent/tea-component";
import { source } from '../demo/index.js';
import { docs } from '../docs';
import { IS_MOBILE, IS_IOS } from '../util/browser.ts';
import { generatePlayerConfigs } from '../util/constant.ts';
import IframeCommunication from '../libs/iframe';
import '../index.css';

import TCPlayer from 'tcplayer.js';
import 'tcplayer.js/dist/tcplayer.min.css';

const { Header, Body, Content } = Layout;
const flexStyle = {display: 'flex', justifyContent: 'space-around', alignItems: 'center'};
const labelStyle = { width: '16px', height: '16px', marginRight: '6px' };

function clearIframe(id){
  var el = document.getElementById(id),
  iframe = el && el.contentWindow;
  if(el) {
    // eslint-disable-next-line no-script-url
    el.src = 'javascript:void(0)';
  try {
    iframe.document.write('');  
    iframe.document.clear();
  } catch(e){

  };
}} 

// TODO: 国际站国内站分包之后，国际站默认启用英文，将不需要在此设置语言
const modifyLanguage = (string) => {
  if (window.lang === 'en') {
    string = string.replace(`var player = TCPlayer("player-container-id", {`, `
  var player = TCPlayer("player-container-id", {
    language: "en",`);
  }

  return string;
}

const sources = {
  zh: {
    url: 'https://1500005692.vod2.myqcloud.com/43843706vodtranscq1500005692/62656d94387702300542496289/v.f100240.m3u8',
    fileID: '387702307847129127', // 请传入需要播放的视频filID 必须
    appID: '1500006438', // 请传入点播账号的appID 必须
    psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
  },
  en: {
    url: 'https://1500009007.vod2.myqcloud.com/43864de0vodtranscq1500009007/2fb02795387702305297108918/v.f100280.m3u8',
    fileID: '387702305297108918',
    appID: '1500009007',
  }
}

// http://localhost:3000/?type=playurl&autoplay=true&url=http://1500005692.vod2.myqcloud.com/6c9a495evodcq1500005692/55c68124243791579374039499/icRVCAWqxZcA.mp4

function App() {
  const [value, setValue] = useState(getUrlParameter('type') || 'playurl');
  const [code, setCode] = useState(source[value] || '');
  const [communication, setCommunication] = useState();
  const [url, setUrl] = useState(getUrlParameter('url') || sources[window['LANGUAGE']].url);
  const [fileID, setFileID] = useState(getUrlParameter('fileid') || sources[window['LANGUAGE']].fileID);
  const [appID, setAppID] = useState(getUrlParameter('appid') || sources[window['LANGUAGE']].appID);
  const [psign, setPsign] = useState(getUrlParameter('psign') || sources[window['LANGUAGE']].psign);
  const panelRef = useRef();

  const [playerInstance, setPlayerInstance] = useState();

  const onPreview = ({ url, type, fileID, appID, psign }) => {
    const sourcecode = source[`play${type}`];
    if (type === 'url') {
      setUrl(url);
      setTimeout(() => {
        setCode(modifyLanguage(sourcecode.replace('foo_url', url)));
      }, 100);
    }

    if (type === 'fileid') {
      setFileID(fileID);
      setAppID(appID);
      setPsign(psign);
      let sourcecodeNew = sourcecode.replace('foo_fileID', fileID).replace('foo_appID', appID).replace('foo_psign', (psign || ''));
      setTimeout(() => {
        setCode(modifyLanguage(sourcecodeNew));
      }, 100);
    }
  }

  // 切换说明面板
  const switchDesc = () => {
    const panel = panelRef.current;
    // document.querySelector('.m-desc-panel');
    const panelClassName = panel.className;
    if (panel && panelClassName.indexOf('desc-hide') > -1) {
      panel.className = 'm-desc-panel';
    } else {
      panel.className = 'm-desc-panel desc-hide';
    }
  }

  const generateQrAddress = (value, communication = communication) => {
    let qrcodeAddress = `https://tcplayer.vcube.tencent.com/experience-center/build/index.html?type=${value}`;
    if (value === 'playurl') {
      qrcodeAddress += `&url=${url}`;
    }

    if (value === 'playfileid') {
      qrcodeAddress += `&fileID=${fileID}&appID=${appID}&psign=${psign}`;
    }

    communication.sendMessage('player-qrcode', {
      url: qrcodeAddress,
    });
    return qrcodeAddress;
  };


  const sendMessage = (value, communication = communication) => {
    switch(value) { 
      case 'playurl':
        communication.sendMessage('player-play-url', {});
        break;
      case 'playfileid':
        communication.sendMessage('player-play-fileID', {});
        break;
      case 'vttThumbnail':
        communication.sendMessage('player-thumbnail', {});
        break;
      case 'dynamicWatermark':
        communication.sendMessage('player-dynamic-watermark', {});
        break;
      case 'customUI':
        communication.sendMessage('player-custom-ui', {});
        break;
      case 'poster':
        communication.sendMessage('player-poster', {});
        break;
      case 'fileStatistic':
        communication.sendMessage('player-statistic', {});
        break;
      default:
    }
  }
  // 切换功能
  const switchFunc = (value) => {
    clearIframe('previewIframe');
    setValue(value);
    sendMessage(value, communication);
    generateQrAddress(value, communication); 
  };


  useEffect(() => {
    const communicationInstance = new IframeCommunication({
      isParent: false,
      from: 'player',
      to: 'experience-center',
      targetWindow: window.top
    });

    setCommunication(communicationInstance);

    communicationInstance.sendMessage('demoReady', {});
    communicationInstance.sendMessage('request-login', {});
    sendMessage(value, communicationInstance);
    generateQrAddress(value, communicationInstance);

    // communication.on('experience-device', (data: {from: string; to: string; cmd: string; params: object}) => {
    // // 这里的 cmd 即 experience-device
    // });
  }, []);

  useEffect(() => {
    if (value === 'playurl') {
      setCode(modifyLanguage(source[value].replace('foo_url', url)));
    }

    if (value === 'playfileid') {
      let sourcecodeNew = source[value].replace('foo_fileID', fileID).replace('foo_appID', appID).replace('foo_psign', (psign || ''));
      setCode(modifyLanguage(sourcecodeNew));
    }

    if (value !== 'playurl' && value !== 'playfileid') {
      setCode(modifyLanguage(source[value]));
    }


    // ios 微信不支持 iframe
    if (IS_IOS) {
      if (playerInstance && playerInstance.length > 0) {
        playerInstance.forEach(item => {
          try {
            item.dispose();
          } catch (e) {
            console.log('error: ', e.message);
          }
        });
      }


      const videoWrapper = document.querySelector('.m-play-panel');


      if (value === 'customUI') {
        videoWrapper.innerHTML = '<video id="player-container-id" class="tcplayer-theme-custom-ui" preload="auto" width="640" height="360" playsInline webkit-playsinline="true"></video>';
      } else if (value === 'multi') {
        videoWrapper.innerHTML = `<video id="player-container-id1" preload="auto" width="414" height="270" playsinline webkit-playsinline>
        </video>
        <video id="player-container-id2" preload="auto" width="414" height="270" playsinline webkit-playsinline>
        </video>`;
      } else {
        videoWrapper.innerHTML = '<video id="player-container-id" preload="auto" width="640" height="360" playsInline webkit-playsinline="true"></video>';
      }

      

      const configs = generatePlayerConfigs(value, url, fileID, appID, psign);

      console.log('configs', configs);
      const playerInstanceArray = [];
      configs.forEach(element => {
        if (value === 'customUI') {
          const Button = TCPlayer.getComponent('Button');
          const BigPlayButton = TCPlayer.getComponent('BigPlayButton');
          BigPlayButton.prototype.createEl = function () {
            var el = Button.prototype.createEl.call(this);
            let _html = '<button><svg t="1644397862160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3095" width="64" height="64"><path d="M298.666667 247.04V682.666667a42.666667 42.666667 0 0 1-85.333334 0V170.666667a42.666667 42.666667 0 0 1 65.024-36.352l554.666667 341.333333a42.666667 42.666667 0 0 1 0 72.704l-554.666667 341.333333a42.666667 42.666667 0 0 1-44.714666-72.704L729.258667 512 298.666667 247.04z" p-id="3096" fill="#ffffff"></path></svg></button>';

            el.appendChild(TCPlayer.dom.createEl('div', {
              className: 'vjs-button-icon',
              innerHTML: _html,
            }));
            return el;
          };

          // var controlBar = TCPlayer.getComponent('controlBar');
          // controlBar.prototype.options_ = {
          //   children: ['playToggle', 'volumePanel', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'liveDisplay', 'remainingTimeDisplay', 'customControlSpacer', 'playbackRateMenuButton', 'chaptersButton', 'descriptionsButton', 'fullscreenToggle']
          // }
        }

        if (value === 'poster') {
          var PosterImage = TCPlayer.getComponent('PosterImage');
          PosterImage.prototype.handleClick = function() {
            window.open("https://cloud.tencent.com/product/vcube");
          }
        }

        const player = TCPlayer(element.containerId, element);
        playerInstanceArray.push(player);

        if (value === 'subtitles') {
          player.on("ready", function() {
            var subTrack = player.addRemoteTextTrack({src: "//tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/vtt/%E4%B8%AD%E6%96%87.vtt", kind:"subtitles" , srclang:"zh-cn", label:"Chinese", default:"true"}, true);
            subTrack.addEventListener("load", function(){
              console.log("subTrack load", subTrack.track);
            });
            subTrack.track.addEventListener("load", function(){
              console.log("subTrack.track load");
            });
            subTrack.track.addEventListener("cuechange", function(event) {
              var currentCue = this.activeCues[0];
              console.log("cuechange", this);
            });
        
            var subTrack = player.addRemoteTextTrack({src: "//tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/vtt/%E8%8B%B1%E6%96%87.vtt", kind:"subtitles" , srclang:"en", label:"English", default:"false"}, true);
          });
        }

        if (value === 'poster') {
          var adTextNode = document.createElement('span');
          adTextNode.className = "ad-text-node";
          adTextNode.innerHTML = '广告';
        
          var adCloseIconNode = document.createElement('i');
          adCloseIconNode.className = 'ad-close-icon-node';
          adCloseIconNode.onclick = function(e) {
            e.stopPropagation();
            player.posterImage.hide();
          }
        
          player.posterImage.el_.appendChild(adTextNode);
          player.posterImage.el_.appendChild(adCloseIconNode);
        
          player.on('pause', function() {
            player.posterImage.show();
            player.posterImage.el_.style.width = '60%';
            player.posterImage.el_.style.height = '60%';
            player.posterImage.el_.style.display = 'flex';
          });
        
          player.on('playing', function() {
            player.posterImage.hide();
          });
        }


        setPlayerInstance(playerInstanceArray);
      });
    }


  }, [value]);

  
  const generateMobileVideoDom = () => {
    if (!IS_IOS) {
      return (<iframe
        id="previewIframe"
        title="previewIframe"
        srcDoc={code}
        frameBorder="0"
        width="100%"
        height="240px"
        allowFullScreen={true}
        style={{background: '#bdbdbd'}}
      ></iframe>)
    }
  }

  const experienceMode = 'none';

  if (IS_MOBILE) {
    return (
      <>
        <div className="m-play-panel">
          {
            generateMobileVideoDom()
          }
        </div>
        
        <section className="m-desc-panel desc-hide" ref={panelRef}>
          {
            docs[value] ? (
              <>
                <span className="desc-switch" onClick={switchDesc}>
                  说明
                  <Icon className="arrowup" type="arrowup" />
                  <Icon className="arrowdown" type="arrowdown" />
                </span>
                <div>{docs[value]}</div>
              </>
            ) : null
          }
        </section>

        <div className="m-function-select-panel">
          <section>
            <div className="flex">
              <img id="icon-play" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-play.png" />
              <H5 className="inline-block mgrb10">{t('视频播放')}</H5>
            </div>
            <div>
              <Segment
                value={value.toString()}
                onChange={switchFunc}
                rimless={true}
                options={[
                  { text: t('URL 播放'), value: 'playurl' },
                  { text: t('FileID 播放'), value: 'playfileid' },
                  { text: t("自适应码流"), value: "qualityApi" },
                  { text: t("DASH 播放"), value: "dash" },
                ]}>
              </Segment>
            </div>
          </section>

          <section>
            <div className="flex">
              <img id="icon-control" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-control.png" />
              <H5 className="inline-block mgrb10">{t('播放控制')}</H5>
            </div>


            <div>
              <Segment
                value={value.toString()}
                onChange={switchFunc}
                rimless={true}
                options={[
                  { text: t("缩略图预览-云端生成文件"), value: "vttThumbnail" },
                  { text: t("缩略图预览-手动传入文件"), value: "vttThumbnailSrc"},
                  { text: t("字幕"), value: "subtitles" },
                  { text: t("事件回调"), value: "event" },
                ]}>
              </Segment>
            </div>
          </section>

          <section>
            <div className="flex">
              <img id="icon-safety" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-safety.png" />
              <H5 className="inline-block mgrb10">{t('视频安全')}</H5>
            </div>


            <div>
              <Segment
                value={value.toString()}
                onChange={switchFunc}
                rimless={true}
                options={[
                  { text: t("动态水印"), value: "dynamicWatermark" },
                  { text: t("Key 防盗链"), value: "key" },
                ]}>
              </Segment>
            </div>
          </section>

          <section>
            <div className="flex">
              <img id="icon-display" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-display.png" />
              <H5 className="inline-block mgrb10">{t('显示效果')}</H5>
            </div>


            <div>
              <Segment
                value={value.toString()}
                onChange={switchFunc}
                rimless={true}
                options={[
                  { text: t("贴片广告"), value: "poster" },
                  { text: t("视频镜像"), value: "mirror" },
                  { text: t("提示文案"), value: "customError" },
                  { text: t("播放器尺寸"), value: "sizeAdaptive" },
                  { text: t("自定义 UI"), value: "customUI", },
                  { text: t("多实例"), value: "multi" },
                  { text: t("多语言"), value: "language" },
                ]}>
              </Segment>
            </div>
          </section>

          <section>
            <div className="flex">
              <img id="icon-display" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-data.png" />
              <H5 className="inline-block mgrb10">{t('播放统计')}</H5>
            </div>

            <div>
              <Segment
                value={value.toString()}
                onChange={switchFunc}
                rimless={true}
                options={[
                  { text: t("统计信息"), value: "fileStatistic" },
                ]}>
              </Segment>
            </div>
          </section>
        </div>
      </>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{display: experienceMode}}>
        <NavMenu
          left={
            <>
              <NavMenu.Item type="logo">
                <div className="clg-logo"></div>
              </NavMenu.Item>
            </>
          }
        />
      </Header>
      <Body>
        <section className="top-area" style={{display: experienceMode}}>
          <Text className="top-title">{t('Web端超级播放器体验')}</Text>

          <div className="top-btns">

            {
              window.lang === 'zh' ?
              <Button type="primary" className="primary-btn">
                <a href="https://cloud.tencent.com/document/product/1449/57088" target="_blank" rel="noreferrer">{t('立即使用')}</a>
              </Button>
              : null
            }

            <Button className="secondary-btn">
              <a href={window.lang === "en" ? "https://www.tencentcloud.com/document/product/266/33977" : "https://cloud.tencent.com/product/player"} target="_blank" rel="noreferrer">{t('产品文档')}</a>
            </Button>
            

          </div>
          <Card className="card card-notice">
            <img src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/picture/icon-notice.png" alt=""/>
            <Text>
              <Trans>
              为了获取更好的产品功能及播放性能体验，建议结合腾讯 
              <a href={window.lang === "en" ? "https://www.tencentcloud.com/document/product/266/7836" : "https://cloud.tencent.com/document/product/266/45543" } target="_blank" rel="noreferrer">云点播</a>
              和
              <a href={window.lang === "en" ? "https://www.tencentcloud.com/document/product/267" : "https://cloud.tencent.com/product/css" } target="_blank" rel="noreferrer">云直播</a>
              使用。
              </Trans>
            </Text>
          </Card>
        </section>
        
        <Content style={{background: 'transparent'}}>
          <Content.Body>

          {/* <video id="player-container-id" width="414" height="270" preload="auto" playsinline webkit-playsinline>
          </video> */}
            <Card className="card card-player-function" style={{ borderRadius: '8px'}}>
              <H3>{t('请选择视频播放功能进行体验')}</H3>
              <br />
              <Form>
                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-play" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-play.png" />
                  <H5>{t('视频播放')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      {text: t('URL播放'), value: 'playurl'},
                      {text: t('FileID播放'), value: 'playfileid'},
                      { text: t("自适应码流"), value: "qualityApi" },
                      { text: t("DASH 播放"), value: "dash" },
                    ]}>
                  </Segment>
                </Form.Item>

                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-control" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-control.png" />
                  <H5>{t('播放控制')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      { text: t("缩略图预览-云端生成文件"), value: "vttThumbnail" },
                      { text: t("缩略图预览-手动传入文件"), value: "vttThumbnailSrc"},
                      { text: t("字幕"), value: "subtitles" },
                      { text: t("事件回调"), value: "event" },
                    ]}>
                  </Segment>
                </Form.Item>
                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-safety" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-safety.png" />
                  <H5>{t('视频安全')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      { text: t("动态水印"), value: "dynamicWatermark" },
                      { text: t("幽灵水印"), value: "ghostWatermark" },
                      { text: t("Key 防盗链"), value: "key" },
                    ]}>
                  </Segment>
                </Form.Item>
                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-display" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-display.png" />
                  <H5>{t('显示效果')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      { text: t("贴片广告"), value: "poster" },
                      { text: t("视频镜像"), value: "mirror" },
                      { text: t("提示文案"), value: "customError" },
                      { text: t("播放器尺寸"), value: "sizeAdaptive" },
                      { text: t("自定义 UI"), value: "customUI", },
                      { text: t("多实例"), value: "multi" },
                      { text: t("多语言"), value: "language" },
                    ]}>
                  </Segment>
                </Form.Item>
                <Form.Item label={<div style={flexStyle}>
                  <img id="icon-data" style={labelStyle} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-data.png" />
                  <H5>{t('统计信息')}</H5>
                </div>}>
                  <Segment
                    value={value.toString()}
                    onChange={switchFunc}
                    rimless={true}
                    options={[
                      { text: t("统计信息"), value: "fileStatistic" },
                    ]}>
                  </Segment>
                </Form.Item>
              </Form>
            </Card>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <iframe
                id="previewIframe"
                title="previewIframe"
                srcDoc={code}
                frameBorder="0"
                width="640px"
                height="360px"
                allowFullScreen={true}
                style={{borderRadius: '8px', margin: '20px 20px 20px 0', background: '#bdbdbd'}}
              ></iframe>
              <Card style={{width: 'calc(100% - 640px - 20px)', height: '360px', overflow: 'scroll', borderRadius: '8px', margin: '20px 0 20px 0', padding: '10px 0 0 10px', position: 'relative' }}>
                {/* <Card.Body> */}
                  <section>

                    {
                      value === 'playurl' ? <>
                        <PlayPanel key="playurl" onPreview={onPreview} type="url"></PlayPanel>
                      </> : null
                    }

                    {
                      value === 'playfileid' ? <>
                        <PlayPanel key="playfileid" onPreview={onPreview} type="fileid"></PlayPanel>
                      </> : null
                    }

                    {
                      value !== 'playurl' && value !== 'playfileid' ? <>
                        <Copy text={code}>
                          <img id="icon-copy" style={{ width: '16px', height: '16px', cursor: 'pointer', marginLeft: '650px' }} alt="" src="https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/experience-center/assets/icon-copy.png" />
                        </Copy>
                        <MonacoEditor
                          // className="tea-code-pre"
                          monaco={monaco}
                          height={360}
                          value={code}
                          language="javascript"
                          onChange={val => setCode(val)}
                          defaultValue={code}
                        />
                      </> : null
                    }               
                  </section>
                {/* </Card.Body> */}
              </Card>
            </div>

            {
              docs[value] ? (
                <Card style={{ borderRadius: '8px'}}>
                  <Card.Body>
                    {
                      <div>{docs[value]}</div>
                    }
                  </Card.Body>
                </Card>
              ) : null
            }
              
          </Content.Body>
        </Content>
      </Body>
    </Layout>
  );
}
export default App;
