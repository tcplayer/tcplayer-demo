import "@tencent/tea-component/dist/tea.css";
import "../App.css";
import React, { useState, useEffect} from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import PlayPanel from "../components/playPanel";
import { Uploader } from "../components/Upload";
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
  Upload,
} from "@tencent/tea-component";
import { source } from '../demo/index.js';
import { docs } from '../docs';
const { Header, Body, Content } = Layout;
const videoMimes = '.mp4,.ts,.flv,.wmv,.asf,.rm,.rmvb,.mpg,.mpeg,.3gp,.mov,.webm,.mkv,.avi,.mp3,.m4a,.flac,.ogg,.wav,.aac';


declare global {
  interface Window {
    lang: string;
  }
}



// function clearIframe(id){
//   var el = document.getElementById(id),
//   iframe = el && el.contentWindow;
//   if(el) {
//     // eslint-disable-next-line no-script-url
//     el.src = 'javascript:void(0)';
//   try {
//     iframe.document.write('');  
//     iframe.document.clear();
//   } catch(e){

//   };
// }} 


// TODO: 国际站国内站分包之后，国际站默认启用英文，将不需要在此设置语言
const modifyLanguage = (string) => {
  if (window.lang === 'en') {
    string = string.replace(`var player = TCPlayer("player-container-id", {`, `
  var player = TCPlayer("player-container-id", {
    language: "en",`);
  }

  return string;
}

function App() {
  const [value, setValue] = useState('play');
  const [code, setCode] = useState(source[value] || '');
  const type = getUrlParameter('type') || 'play';
  

  const onPreview = ({ url, type, fileID, appID, psign }) => {
    const sourcecode = source[`play${type}`];
    if (type === 'url') {
      setCode(modifyLanguage(sourcecode.replace('foo_url', url)));
    }

    if (type === 'fileid') {
      let sourcecodeNew = sourcecode.replace('foo_fileID', fileID).replace('foo_appID', appID).replace('psign', (psign || ''));
      setCode(modifyLanguage(sourcecodeNew));
    }
  }

  useEffect(() => {
    setValue(type);
  }, []);



  const getSignature = () => {
    return 'VVmnIC7ZKAdNd1JYWhS6MdoKROFzZWNyZXRJZD1BS0lENjRyUm54c1o5V2diSGl0b1Z3ODRrQUtEcUROSXkydFcmY3VycmVudFRpbWVTdGFtcD0xNjYyNjE5NjcyJmV4cGlyZVRpbWU9MTY2NTIxMTY3MiZyYW5kb209MTY2MjYxOTY3MiZ2b2RTdWJBcHBJZD0xNTAwMDE1MDY0';
  }

  const getSignatureAcc = () => {
    return 'K9rxq6mDYUFCIJnj56/Q7dqvhe1zZWNyZXRJZD1BS0lETFRLdURGMFRmYURaZVN6RkV3QkFzSlRNeElNOGRyb1QmY3VycmVudFRpbWVTdGFtcD0xNjYyNjE5NTE2JmV4cGlyZVRpbWU9MTY2NTIxMTUxNiZyYW5kb209MTY2MjYxOTUxNiZ2b2RTdWJBcHBJZD0xNTAwMDE1MDA2';
  }

  const handleFileUpload = (files) => {
      
    // 去重
    // const uniqedFiles = differenceBy(files as LocalFile[], fileList, 'name')
    // // 补充结构
    //   .map((item, index) => {
    //     item.mediaName = item.name;
    //     item.sizeStr = getFileSizeText(item.size);
    //     item.classId = 0;
    //     return item as LocalFile;
    //   });
    // setFileList(list =>
    //   // list.push(...uniqedFiles);
    //   [...list, ...uniqedFiles]);
  };

  useEffect(() => {
    if (value !== 'play') {
      setCode(modifyLanguage(source[value]));
    }
  }, [value]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
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
        <section className="top-area">
          <Text className="top-title">{t('云点播功能体验')}</Text>


          {/* 面向音视频、图片等媒体，提供制作上传、存储、转码、媒体处理、媒体 AI、加速分发播放、版权保护等一体化的高品质媒体服务。 */}
          {/* <div className="top-btns">

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
            

          </div> */}
          
        </section>
        
        <Content>
          <Content.Body>
            <Card>
              <div>
                <Uploader
                  type={'button'}
                  onUploaded={handleFileUpload}
                  accept={videoMimes}
                  getSignature={getSignature}
                />
              </div>
        
              <div>
                <Uploader
                  type={'button'}
                  onUploaded={handleFileUpload}
                  accept={videoMimes}
                  getSignature={getSignatureAcc}
                />
              </div>
            </Card>
          </Content.Body>
        </Content>
      </Body>
    </Layout>
  );
}
export default App;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
