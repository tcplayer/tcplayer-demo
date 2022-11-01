import React, { useState, useRef, useEffect } from 'react';
import TcVod from 'vod-js-sdk-v6';
import { t } from '@tencent/tea-app/lib/i18n';
import { Upload, Button, Text, Input } from '@tencent/tea-component';
// import { checkVideoType } from '@src/utils/string';

// interface UploaderProps {
//   type: 'button' | 'dnd';
//   format?: 'tableFooter';
//   onUploaded?: (file) => void;
//   accept?: React.InputHTMLAttributes<HTMLInputElement>['accept'];
//   dragBoxText?: string;
// }

const baseStyle = { display: 'flex', justifyContent: 'center',  alignItems: 'center', minHeight: '250px' };

const boxStyle = {
  fontSize: '12px',
  border: '1px solid #ddd',
  borderTop: 0,
  position: 'relative',
  top: '-2px',
};

const videoMimes = '.mp4,.ts,.flv,.wmv,.asf,.rm,.rmvb,.mpg,.mpeg,.3gp,.mov,.webm,.mkv,.avi,.mp3,.m4a,.flac,.ogg,.wav,.aac';

export const Uploader = function ({ type, accept = videoMimes, getSignature, ...restProps }) {
  const [fetching, setFetching] = useState(false);
  const [tcVod, setTcVod] = useState(); 
  const inputRef = useRef();


  useEffect(() => {
    const tcVodInstance = new TcVod({
      getSignature,
    })

    setTcVod(tcVodInstance);
  }, []);

  const handleInputFiles = function (e) {
    // setFetching(true);
    // const input = e.target || e.srcElement;
    // const { files } = input;
    // const fileList: any[] = [];
    // for (let i = 0; i < files.length; i++) {
    //   const f = files[i];
    //   fileList.push(f);
    // }
    // e.target.value = '';

    // restProps.onUploaded && restProps.onUploaded(fileList);
    // setFetching(false);

    const input = e.target || e.srcElement;
    const { files } = input;

    const startTime = new Date().getTime();

    console.log('start', startTime);
    var uploader = tcVod.upload({
      mediaFile: files[0],
    })
    uploader.on('media_progress', function (info) {
      uploaderInfo.progress = info.percent;
    })
    uploader.on('media_upload', function (info) {
      uploaderInfo.isVideoUploadSuccess = true;
    })

    console.log(uploader, 'uploader')

    var uploaderInfo = {
      videoInfo: uploader.videoInfo,
      isVideoUploadSuccess: false,
      isVideoUploadCancel: false,
      progress: 0,
      fileId: '',
      videoUrl: '',
      cancel: function() {
        uploaderInfo.isVideoUploadCancel = true;
        uploader.cancel();
        // self.$refs.vExample.reset();
      },
    }

    // this.uploaderInfos.push(uploaderInfo)

    uploader.done().then(function(doneResult) {

      const endTime = new Date().getTime();

      console.log('end', endTime);
      console.log('duration', endTime - startTime)

      // uploaderInfo.fileId = doneResult.fileId;
      // return getAntiLeechUrl(doneResult.video.url);
    }).then(function (videoUrl) {
      // uploaderInfo.videoUrl = videoUrl
      // self.$refs.vExample.reset();
    })
  };
  return <>
    {/* TODO:修复这里的ts错误 */}
    <input style={{ display: 'none' }} ref={inputRef} type='file' onChange={handleInputFiles} multiple={true} accept={accept}/>
    <Button onClick={() => inputRef.current.click()} loading={fetching}>{t('选择视频')}</Button> <Text theme='text'>{t('支持 WMV、RM、MOV、MPEG、MP4、3GP、FLV、AVI、RMVB 等格式批量上传。')}</Text>
  </>
};
