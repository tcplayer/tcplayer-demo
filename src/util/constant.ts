import { t, Trans } from '@tencent/tea-app/lib/i18n';

export const typeMap = [
    { text: t('URL 播放'), value: 'playurl' },
    { text: t('FileID 播放'), value: 'playfileid' },
    { text: t("自适应码流"), value: "qualityApi" },
    { text: t("DASH 播放"), value: "dash" },


    { text: t("缩略图预览-云端生成文件"), value: "vttThumbnail" },
    { text: t("缩略图预览-手动传入文件"), value: "vttThumbnailSrc"},
    { text: t("字幕"), value: "subtitles" },
    { text: t("事件回调"), value: "event" },

    { text: t("动态水印"), value: "dynamicWatermark" },
    // { text: t("幽灵水印"), value: "ghostWatermark" },
    { text: t("Key 防盗链"), value: "key" },

    { text: t("贴片广告"), value: "poster" },
    { text: t("视频镜像"), value: "mirror" },
    { text: t("提示文案"), value: "customError" },
    { text: t("播放器尺寸"), value: "sizeAdaptive" },
    { text: t("自定义 UI"), value: "customUI", },
    { text: t("多实例"), value: "multi" },
    { text: t("多语言"), value: "language" },

    { text: t("统计信息"), value: "fileStatistic" },
]


export const generatePlayerConfigs = (type, url?, fileID?, appID?, psign?) => {
    const defaultConfigMap = ['qualityApi', 'dash', 'vttThumbnail', 'vttThumbnailSrc', 'subtitles', 'event', 'dynamicWatermark', 'key', 'poster', 'mirror', 'customError', 'sizeAdaptive', 'customUI']; 

    if (type === 'playurl') {
        playConfigs[type].sources = [url];
        return [playConfigs[type]];
    }

    if (type === 'playfileid') {
        return [{ ...playConfigs[type], ...{ fileID, appID, psign } }];
    }


    if (type === 'multi') {
        return playConfigs[type]
    }


    return [{ ...playConfigs[type] }]; 

    if (defaultConfigMap.includes(type)) {
        return [{ ...playConfigs[type] }]; 
    }

}

export const playConfigs = {
    playurl: {
        containerId: 'player-container-id',
        sources: []
    },

    playfileid: {
        containerId: 'player-container-id',
        fileID: 'foo_fileID',
        appID: 'foo_appID',
        psign: 'foo_psign',
    },

    qualityApi: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
    },

    dash: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNzcxOSwiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MjB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.sHFC83r3gyzX52fHqwPXT6MUdmF1odmE5Ohu18uQ5os",
    },


    vttThumbnail: {
        containerId: 'player-container-id',
        fileID: "387702307859199833",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODU5MTk5ODMzIiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIzOTE1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJPcmlnaW5hbCIsImltYWdlU3ByaXRlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDYyODE2MDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.k6__4IcCUq1QzZUijsntfIqrXCDuk6TQagrpAh0WEyw',
    },

    vttThumbnailSrc : {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
        plugins:{
            VttThumbnail:{
                "vttUrl": "https://1500006438.vod2.myqcloud.com/4384ba25vodtranscq1500006438/dc407ac1387702307859199833/imageSprite/imageSprite_10.vtt?t=7fffffff&sign=1924eb1b9fa4ec13d0a96550ba2b5944"
            }
        }
    },

    subtitles: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
    },

    event: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
    },

    dynamicWatermark: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
        plugins:{
            DynamicWatermark: { //
                type: 'text',
                speed: 0.2,// 建议取值范围 0<= speed <=1，默认值 0.2
                content: '腾讯云视立方播放器SDK', // 类型必须为String，
                opacity: 0.5,
                fontSize: '12px', // type === text 时有效, 其余字段通用
                color: '#bdbdbd',
            }
        }
    },

    key: {
        containerId: 'player-container-id',
        fileID: "3701925922317243892", 
        appID: "1500006438",
        psign: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzcwMTkyNTkyMjMxNzI0Mzg5MiIsImN1cnJlbnRUaW1lU3RhbXAiOjE2Mjg0ODEyMjMsImV4cGlyZVRpbWVTdGFtcCI6MjYyODQ4MTIyMywidXJsQWNjZXNzSW5mbyI6eyJleHBlciI6MzAwLCJ0IjoiOWNhYjcwYzcifSwiZHJtTGljZW5zZUluZm8iOnsiZXhwaXJlVGltZVN0YW1wIjoyNjI4NDgxMjIzfX0.OMKu5mJsdIYtXhFX8-vdsJmw6dvcFIngadJShOlKIzs",
    },

    poster: {
        containerId: 'player-container-id',
        fileID: "387702305305947266",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA1MzA1OTQ3MjY2IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIzNzQyNywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIxNzc0MjQwMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.SnZnyJxJKGnFaz7M0SNWWs41NCZdCPhc-_lyHSuiXlA',
        poster: "https://tcplayer-1306264703.cos.ap-nanjing.myqcloud.com/picture/poster.png",
    },

    mirror: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
        plugins:{
            ContextMenu: {
                mirror: true
            }
        }
    },

    customError: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        // psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
        languages:{
            "zh-cn":{
                "Without anti-leech information.": "可定义错误提示文案，如：没带防盗链检测参数，请重试"
            }
        }
    },

    sizeAdaptive: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
    },

    customUI: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
    },

    multi: [
        {
            containerId: 'player-container-id1',
            fileID: "387702307847129127",
            appID: "1500006438",
            psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
        }, {
            containerId: 'player-container-id2',
            fileID: "3701925924406245944",
            appID: "1500006438",
            psign: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzcwMTkyNTkyNDQwNjI0NTk0NCIsImN1cnJlbnRUaW1lU3RhbXAiOjE2MzE3ODEyMzYsImV4cGlyZVRpbWVTdGFtcCI6MTkxNTg2NDQxNCwicGNmZyI6ImJhc2ljRHJtUHJlc2V0IiwidXJsQWNjZXNzSW5mbyI6eyJleHBlciI6MzAsInQiOiIxOTE1ODY0NDE0In19.F9gD5SidAoQPH4rDz4dr9-Z6DpoojOkHX_23kZPJ72A",
        }
    ],

    language: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
        language: "en",
        languages: {
            "en": {
                "全高清": "FHD",
                "高清": "HD",
                "标清": "SD",
                "流畅": "FLU",
            }
        }
    },

    fileStatistic: {
        containerId: 'player-container-id',
        fileID: "387702307847129127",
        appID: "1500006438",
        psign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6MTUwMDAwNjQzOCwiZmlsZUlkIjoiMzg3NzAyMzA3ODQ3MTI5MTI3IiwiY3VycmVudFRpbWVTdGFtcCI6MTY2NzIxNjY1MywiY29udGVudEluZm8iOnsiYXVkaW9WaWRlb1R5cGUiOiJSYXdBZGFwdGl2ZSIsInJhd0FkYXB0aXZlRGVmaW5pdGlvbiI6MTB9LCJleHBpcmVUaW1lU3RhbXAiOjIyMDEwMTEyMDAsInVybEFjY2Vzc0luZm8iOnsiZG9tYWluIjoiMTUwMDAwNjQzOC52b2QyLm15cWNsb3VkLmNvbSIsInNjaGVtZSI6IkhUVFBTIn19.AYqjCMFQlo9nn6EMaF0Nol5vVq9miaoUqyvmFF62aSg',
        plugins: {
          ProgressMarker: true,
          ContextMenu: {
            statistic: true
          }
        }
    }

}