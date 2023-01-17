import React from "react";
import { List, Row, Col, Table, Text } from "@tencent/tea-component";
import { t, Trans } from '@tencent/tea-app/lib/i18n';

function Title({ children }) {
  return <h3 style={{ margin: "10px 0" }}>{children}</h3>;
}

const sizeAdaptive = (() => {
  return <Row>
    <Col>
      <Title>{t('播放器尺寸设置说明')}</Title>
      <List type="bullet">
        <List.Item>{t('可以给 video 标签设置 width 和 height 属性，width 和 height 的属性值是以像素计量的（如 width = "100px" 或 width = 100），不能设置百分比。')}</List.Item>
        <List.Item>{t('可以通过 CSS 设置尺寸，支持像素和百分比等类型的值（如 width:"100px" 或 width:"100%" ）。')}</List.Item>
        <List.Item>{t('如果不设置宽高，播放器在获取到视频的分辨率后，将会以视频的分辨率设置播放器的显示尺寸，如果浏览器的可视区域尺寸小于视频分辨率，会造成播放器区域超出浏览器的可视区域，所以通常不建议这样做。最佳实践为通过 CSS 设置播放器的尺寸。')}</List.Item>
        <List.Item>{t('熟练运用 CSS 可以实现铺满全屏、容器自适应等效果。')}</List.Item>
      </List>
    </Col>
  </Row>
})();

const continuePlay = (() => {
  return <Row>
    <Col>
      <Title>{t('续播说明')}</Title>
      <List type="bullet">
        <List.Item>{t('仅使用腾讯云点播进行转码后的视频才可使用该功能，通过传入云点播账户 AppID 和云点播文件标识 FileID 进行播放。')}</List.Item>
        <List.Item>{t('该功能通过 localStorage 存储播放时间点，浏览器需支持该特性。')}</List.Item>
        <List.Item>{t('在浏览器劫持视频播放的情况下，该功能无法使用。')}</List.Item>
        <List.Item>{t('该功能不支持多端多浏览器互通，例如在某 PC 浏览器上观看后，无法在移动端浏览器或 PC 上另一个浏览器进行断点续播，若需相关能力可在本功能基础上自主开发额外的接口。')}</List.Item>
        {/* <List.Item>{t('')}开启成功后将会看到的效果如下图：<br /><br /><img src="https://mc.qcloudimg.com/static/img/e155be329a6fec959e1ad6b361add390/image.png" /></List.Item> */}
      </List>
    </Col>
  </Row>
})();

const dynamicWatermark = (() => {
  return <Row>
    <Col>
      <Title>{t('动态水印说明')}</Title>
      <List type="bullet">
        <List.Item>{t('动态水印移动范围为实际视频显示区域，如果视频自带黑边，播放器无法进行规避。')}</List.Item>
        <List.Item>{t('在使用动态水印功能时，播放器对象的引用不能暴露到全局环境，否则动态水印可以轻易去除。')}</List.Item>
        <List.Item>{t('动态水印不适合移动端场景，特别是劫持播放的场景。')}</List.Item>
        <List.Item>{t('可以通过屏蔽全屏按钮，规避部分全屏后被劫持导致水印失效的情况。')}</List.Item>
      </List>
    </Col>
  </Row>
})();

const vttThumbnail = (() => {
  return <Row>
    <Col>
      <Title>{t('缩略图预览说明')}</Title>
      <List type="bullet">
        {/* TODO: */}
        <List.Item>
          <Trans>
            通过服务端 API 生成视频的缩略图与 VTT 文件，相关文档可参阅 <a href="https://cloud.tencent.com/document/product/266/33480#.E9.9B.AA.E7.A2.A7.E5.9B.BE.E6.A8.A1.E6.9D.BF" target="_blank" rel="noreferrer">截图 - 雪碧图</a>
          </Trans>
        </List.Item>
        <List.Item>{t('自行生成缩略图文件与 VTT 文件，并将两个文件的 URL 传递给播放器，参考示例“缩略图预览 - 传入缩略图与 VTT 文件”')}</List.Item>
        <List.Item>{t('该功能仅支持桌面端浏览器。')}</List.Item>
        <List.Item>{t('在浏览器劫持视频播放的情况下，该功能无法使用。')}</List.Item>
        <List.Item>{t('生成的缩略图越多，进度条预览越精确，而缩略图越多，图片越大加载越慢，需要取舍平衡。')}</List.Item>
      </List>
    </Col>
  </Row>
})();

const vttThumbnailSrc = (() => {
  return <Row>
    <Col>
      <Title>{t('缩略图预览说明')}</Title>
      <List type="bullet">
        {/* <List.Item>{t('')}通过服务端 API 生成视频的缩略图与 VTT 文件，相关文档可参阅 <a href="https://cloud.tencent.com/document/product/266/33480#.E9.9B.AA.E7.A2.A7.E5.9B.BE.E6.A8.A1.E6.9D.BF" target="_blank">截图 - 雪碧图</a></List.Item> */}
        <List.Item>{t('该功能仅支持桌面端浏览器。')}</List.Item>
        <List.Item>{t('在浏览器劫持视频播放的情况下，该功能无法使用。')}</List.Item>
        <List.Item>{t('生成的缩略图越多，进度条预览越精确，而缩略图越多，图片越大加载越慢，需要取舍平衡。')}</List.Item>
      </List>
    </Col>
  </Row>
})();

const changeFile = (() => {
  return <Row>
    <Col>
      <Title>{t('切换 fileID 播放说明')}</Title>
      <List type="bullet">
        <List.Item>{t('通过实例化对象的 loadVideoByID(args) 方法，可以更换视频进行播放。')}</List.Item>
      </List>
    </Col>
  </Row>
})();

const mirror = (() => {
  return <Row>
    <Col>
      <Title>{t('镜像说明')}</Title>
      <List type="bullet">
        <List.Item>{t('激活镜像功能，可以让视频画面镜像翻转，鼠标右键点击画面选择镜像。')}</List.Item>
        <List.Item>{t('在浏览器劫持视频播放的情况下，该功能无法使用。')}</List.Item>
      </List>
    </Col>
  </Row>
})();


const progressMarker = (() => {
  return <Row>
    <Col>
      <Title>{t('进度条标记说明')}</Title>
      <List type="bullet">
        <List.Item>{t('该功能仅支持桌面端浏览器。')}</List.Item>
        <List.Item>{t('在浏览器劫持视频播放的情况下，该功能无法使用。')}</List.Item>
      </List>
    </Col>
  </Row>
})();

const qualityApi = (() => {
  return <Row>
    <Col>
      <Title>{t('自适应码流播放说明')}</Title>
      <List type="bullet">
        <List.Item>{t('播放HLS自适应码流文件时，播放清晰度将默认采用自动切换逻辑，此时播放器将根据当前带宽，动态选择最合适的码率播放。')}</List.Item>
        <List.Item>{t('HLS 规范的 Master Playlist 可以根据网络速度自适应码率播放，在视频下载过程中，如果网络速度满足下载高码率的 TS 分片时，播放器将切换播放高码率的 TS 分片，反之播放低码率的 TS 分片。移动端和桌面端大部分浏览器都支持该特性。')}</List.Item>
        <List.Item>{t('由于部分浏览器没有提供相应的接口和不支持 MSE，这些浏览器无法手动选择特定的清晰度，也不会显示切换清晰度的选项。')}</List.Item>
      </List>
    </Col>
  </Row>
})();


const levelSwitchTips = (() => {
  return <Row>
    <Col>
      <Title>{t('清晰度切换提示说明')}</Title>
      <List type="bullet">
        <List.Item>{t('可在播放器初始化时开启清晰度切换提示开关，详见代码示例。')}</List.Item>
        <List.Item>{t('由于部分浏览器没有提供相应的接口和不支持 MSE，这些浏览器无法手动选择特定的清晰度，也不会显示切换清晰度的选项。')}</List.Item>
      </List>
    </Col>
  </Row>
})();


const key = (() => {
  return <Row>
    <Col>
      <Title>{t('Key 防盗链说明')}</Title>
      <List type="bullet">
        <List.Item>
          <Trans>
            开启流程请参见 <a href="https://cloud.tencent.com/document/product/266/14047" target="_blank" rel="noreferrer">Key 防盗链</a>。
          </Trans>
        </List.Item>
        <List.Item>
          <Trans>
            参数 psign 即超级播放器签名，其具体含义请参见  <a href="https://cloud.tencent.com/document/product/266/42436" target="_blank" rel="noreferrer">超级播放器签名</a>。
          </Trans>
        </List.Item>  
      </List>
    </Col>
  </Row>
})();

const trial = (() => {
  return <Row>
    <Col>
      <Title>{t('试看说明')}</Title>
      <List type="bullet">
        <List.Item><Trans>使用试看功能需要先开启 Key 防盗链，开启流程请参见 <a href="https://cloud.tencent.com/document/product/266/14047" target="_blank" rel="noreferrer">Key 防盗链</a>。</Trans></List.Item>
        <List.Item>{t('播放器播放的视频时长是 exper 参数指定的长度，与以往在播放端控制播放时长的试看功能不同，播放器不会获取完整的视频。')}</List.Item>
        <List.Item>{t('试看时长是根据视频关键帧进行裁剪，实际截取的试看时长可能会比设定值少。')}</List.Item>
        <List.Item>{t('开启试看后播放器仍会显示视频原始时长（在 Chrome 和 Firefox 播放 HLS 格式的试看视频会显示试看时长）。')}</List.Item>
      </List>
    </Col>
  </Row>
})();

const fileStatistic = (() => {
  return <Row>
    <Col>
      <Title>{t('统计信息说明')}</Title>
      <List type="bullet">
        <List.Item>{t('开启右键菜单打开视频统计信息选项。')}</List.Item>
        <List.Item>{t('该功能仅支持桌面端浏览器。')}</List.Item>
        <List.Item>{t('在浏览器劫持视频播放的情况下，该功能无法使用。')}</List.Item>
      </List>
    </Col>
  </Row>
})();

const subtitles = (() => {
  return <Row>
  <Col>
    <Title>{t('字幕说明')}</Title>
    <List type="bullet">
      <List.Item><Trans>添加字幕可以在浏览器端如示例代码所示导入，对自适应码流也可以从云端添加字幕：即从云点播控制台导入字幕或调用 <a href="https://cloud.tencent.com/document/product/266/54235" target="_blank" rel="noreferrer">云 API 关联字幕</a>。</Trans></List.Item>
      <List.Item>{t('云端导入字幕后，播放器播放已关联字幕的文件时会自动加载并处理字幕文件，无需任何配置。')}</List.Item>
      <List.Item><Trans>从控制台导入字幕路径：登录 <a href="https://console.cloud.tencent.com/vod" target="_target" rel="noreferrer">云点播控制台</a>，单击左侧导航栏的媒资管理，选择目标文件，进入管理即可添加字幕。 </Trans></List.Item>
      <List.Item>{t('在不支持 MSE 的浏览器环境，不支持通过控制台导入字幕的方式。')}</List.Item>
    </List>
  </Col>
</Row>
})();

const playurl = (() => {
  return <Row>
  <Col>
    <Title>{t('视频说明')}</Title>
    <List type="bullet">
      <List.Item>{t('支持WebRTC、FLV、HLS的直播流地址，以及HLS、FLV、MP4等格式的点播播放地址。')}</List.Item>
      <List.Item>{t('未经转码的源视频在播放时有可能出现不兼容的情况，建议您使用转码后的视频进行播放。')}</List.Item>
      
    </List>
  </Col>
</Row>
})();

const playfileid = (() => {
  return <Row>
  <Col>
    <Title>{t('视频说明')}</Title>
    <List type="bullet">
      <List.Item>{t('支持WebRTC、FLV、HLS的直播流地址，以及HLS、FLV、MP4等格式的点播播放地址。')}</List.Item>
      <List.Item>{t('未经转码的源视频在播放时有可能出现不兼容的情况，建议您使用转码后的视频进行播放。')}</List.Item>
      
    </List>
  </Col>
</Row>
})();


const records = [
  { name: '-1', description: 'No video has been loaded.	', text: t('播放器没有检测到可用的视频地址。') },
  { name: '-2', description: 'Could not download the video.', text: t('获取视频数据超时。') },
  { name: '1', description: 'You aborted the media playback.', text: t('视频数据加载过程中被中断。') },
  { name: '2', description: 'A network error caused the media download to fail part-way.', text: t('由于网络问题造成加载视频失败。') },
  { name: '3', description: 'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.', text: t('视频解码时发生错误。') },
  { name: '4', description: 'The media could not be loaded, either because the server or network failed or because the format is not supported.', text: t('视频因格式不支持或者服务器或网络的问题无法加载。') },
  { name: '5', description: 'The media is encrypted and we do not have the keys to decrypt it.', text: t('视频解密时发生错误。') },
  { name: '10', description: 'Request timed out.', text: t('点播媒体数据接口请求超时。') },
  { name: '11', description: 'Server is not respond.', text: t('点播媒体数据接口没有返回数据。') },
  { name: '12', description: 'Server respond error data.', text: t('点播媒体数据接口返回异常数据。') },
  { name: '13', description: 'No video transcoding information found.', text: t('播放器没有检测到可以在当前播放器播放的视频数据，请对该视频进行转码操作。') },
  { name: '14', description: 'A network error caused the media download to fail part-way.', text: t('网络错误导致视频下载中途失败。') },
  { name: '15', description: 'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.', text: t('由于视频文件损坏或是该视频使用了您的浏览器不支持的功能，播放终止。') },
  { name: '16', description: 'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.', text: t('由于视频文件损坏或是该视频使用了您的浏览器不支持的功能，播放终止。') },
  { name: '17', description: 'Rise an internal exception when playing HLS.', text: t('播放 HLS 时出现内部异常。') },
  { name: '500', description: 'Server failed.', text: t('媒体服务器错误。') },
  { name: '1001', description: 'The media file does not exist. Please check if the fileID is correct.', text: t('媒体文件不存在，请检查 fileID 是否正确。') },
  { name: '1002', description: 'The trial duration is illegal. The trial duration must be within the video duration.', text: t('试看时长不合法，试看时长要在视频时长范围内。') },
  { name: '1003', description: 'Param pcfg is not unique.', text: t('pcfg 不唯一。') },
  { name: '1004', description: 'The license has expired. Please check whether the expiration time setting is reasonable.', text: t('license 过期，请检查过期时间设置是否合理。') },
  { name: '1005', description: 'Did not find an adaptive stream that can be played.', text: t('没有找到可以播放的自适应码流。') },
  { name: '1006', description: 'Invalid request format, please check the request format.', text: t('请求格式不合法，请检查请求格式。') },
  { name: '1007', description: 'AppID is not exist, Please check if the AppID is correct.', text: t('AppID 不存在，请检查 AppID 是否正确。') },
  { name: '1008', description: 'Without anti-leech information.', text: t('没带防盗链检测。') },
  { name: '1009', description: 'psign check failed.', text: t('播放参数 psign 校验失败。') },
  { name: '1010', description: 'Other errors.', text: t('其他错误。') },
  { name: '2001', description: 'Internal error.', text: t('内部错误。') },
  { name: '10008', description: 'The media file does not exist. Please check if the fileID is correct.', text: t('媒体文件不存在，请检查 fileID 是否正确。') },
];


const customError = (() => {
  return <Row>
    <Col>
      <Title>{t('自定义提示文案说明')}</Title>
      <List type="bullet">
        <List.Item>{t('当您想要自定义提示文案时，可以通过初始化参数 languages 设置指定的提示文案，详见以下列表')}</List.Item>
        <Table
          records={records}
          recordKey="name"
          columns={[
            { key: "name", header: t("错误码"), width: '20%'},
            { key: "description", header: t("描述") },
            { key: "text", header: t("对应文案") },
          ]}
        />
      </List>
    </Col>
  </Row>
})();

const poster = (() => {
  return <Row>
  <Col>
    <Title>{t('广告贴图说明')}</Title>
    <List type="bullet">
      <List.Item><Trans>如果上传的视频已生成封面图，优先使用生成的封面图，详情请看控制台 <a href="https://console.cloud.tencent.com/vod" target="_blank" rel="noreferrer">【云点播】</a>-【音视频管理】。</Trans></List.Item>
    </List>
  </Col>
  </Row>
})();

const playbackRate = (() => {
  return <Row>
  <Col>
    <Title>{t('倍速说明')}</Title>
    <List type="bullet">
      <List.Item>{t('如果浏览器不支持倍速播放，播放器将不会显示倍速切换按钮。')}</List.Item>
    </List>
  </Col>
  </Row>
})();

const event = <Row>
  <Col>
    <Title>{t('事件回调说明')}</Title>
    <List type="bullet">
      <List.Item>
        <Text>{t('完整回调事件及其含义参见')}</Text>
        <a href="https://cloud.tencent.com/document/product/881/30820#.E4.BA.8B.E4.BB.B6" target="_blank" rel="noreferrer">{t('回调')}</a>
      </List.Item>
    </List>
  </Col>
</Row>


export const docs = {
  sizeAdaptive,
  continuePlay,
  vttThumbnail,
  vttThumbnailSrc,
  changeFile,
  mirror,
  progressMarker,
  qualityApi,
  levelSwitchTips,
  key,
  trial,
  fileStatistic,
  customError,
  subtitles,
  dynamicWatermark,
  poster,
  playbackRate,
  event,
  playurl,
  playfileid,
} 
