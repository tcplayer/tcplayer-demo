import React from "react";
import { List, Row, Col, Text } from "@tencent/tea-component";

function Title({ children }) {
  return <h3 style={{ margin: "10px 0" }}>{children}</h3>;
}

const sizeAdaptive = (() => {
  return <Row>
    <Col>
      <Title>播放器尺寸设置说明</Title>
      <List type="bullet">
        <List.Item>可以给 video 标签设置 width 和 height 属性，width 和 height 的属性值是以像素计量的（如 width = "100px" 或 width = 100），不能设置百分比。</List.Item>
        <List.Item>可以通过 CSS 设置尺寸，支持像素和百分比等类型的值（如 width:"100px" 或 width:"100%" ）。</List.Item>
        <List.Item>如果不设置宽高，播放器在获取到视频的分辨率后，将会以视频的分辨率设置播放器的显示尺寸，如果浏览器的可视区域尺寸小于视频分辨率，会造成播放器区域超出浏览器的可视区域，所以通常不建议这样做。最佳实践为通过 CSS 设置播放器的尺寸。</List.Item>
        <List.Item>熟练运用 CSS 可以实现铺满全屏、容器自适应等效果。</List.Item>
      </List>
    </Col>
  </Row>
})();

const continuePlay = (() => {
  return <Row>
    <Col>
      <Title>续播说明</Title>
      <List type="bullet">
        <List.Item>必须通过 fileID 和 appID 播放经过腾讯云转码后的视频，才能使用该功能。</List.Item>
        <List.Item>该功能通过 localStorage 存储播放时间点，浏览器需支持该特性。</List.Item>
        <List.Item>在浏览器劫持视频播放的情况下，该功能无法使用。</List.Item>
        <List.Item>该功能不是多端多浏览器互通的，例如在 PC 浏览器上没看完，不能在移动端浏览器上续播或者在 PC 上另一个浏览器续播，需额外的接口，可以自行开发。</List.Item>
        {/* <List.Item>开启成功后将会看到的效果如下图：<br /><br /><img src="https://mc.qcloudimg.com/static/img/e155be329a6fec959e1ad6b361add390/image.png" /></List.Item> */}
      </List>
    </Col>
  </Row>
})();

const vttThumbnail = (() => {
  return <Row>
    <Col>
      <Title>缩略图预览说明</Title>
      <List type="bullet">
        <List.Item>通过服务端 API 生成视频的缩略图与 VTT 文件，相关文档可参阅 <a href="https://cloud.tencent.com/document/product/266/33480#.E9.9B.AA.E7.A2.A7.E5.9B.BE.E6.A8.A1.E6.9D.BF" target="_blank">截图 - 雪碧图</a></List.Item>
        <List.Item>自行生成缩略图文件与 VTT 文件，并将两个文件的 URL 传递给播放器，参考示例“缩略图预览 - 传入缩略图与 VTT 文件”</List.Item>
        <List.Item>该功能仅支持桌面端浏览器。</List.Item>
        <List.Item>在浏览器劫持视频播放的情况下，该功能无法使用。</List.Item>
        <List.Item>生成的缩略图越多，进度条预览越精确，而缩略图越多，图片越大加载越慢，需要取舍平衡。</List.Item>
      </List>
    </Col>
  </Row>
})();

const vttThumbnailSrc = (() => {
  return <Row>
    <Col>
      <Title>缩略图预览说明</Title>
      <List type="bullet">
        {/* <List.Item>通过服务端 API 生成视频的缩略图与 VTT 文件，相关文档可参阅 <a href="https://cloud.tencent.com/document/product/266/33480#.E9.9B.AA.E7.A2.A7.E5.9B.BE.E6.A8.A1.E6.9D.BF" target="_blank">截图 - 雪碧图</a></List.Item> */}
        <List.Item>该功能仅支持桌面端浏览器。</List.Item>
        <List.Item>在浏览器劫持视频播放的情况下，该功能无法使用。</List.Item>
        <List.Item>生成的缩略图越多，进度条预览越精确，而缩略图越多，图片越大加载越慢，需要取舍平衡。</List.Item>
      </List>
    </Col>
  </Row>
})();

const changeFile = (() => {
  return <Row>
    <Col>
      <Title>切换 fileID 播放说明</Title>
      <List type="bullet">
        <List.Item>通过实例化对象的 loadVideoByID(args) 方法，可以更换视频进行播放。</List.Item>
      </List>
    </Col>
  </Row>
})();

const mirror = (() => {
  return <Row>
    <Col>
      <Title>镜像说明</Title>
      <List type="bullet">
        <List.Item>激活镜像功能，可以让视频画面镜像翻转，鼠标右键点击画面选择镜像。</List.Item>
        <List.Item>在浏览器劫持视频播放的情况下，该功能无法使用。</List.Item>
      </List>
    </Col>
  </Row>
})();


const progressMarker = (() => {
  return <Row>
    <Col>
      <Title>进度条标记说明</Title>
      <List type="bullet">
        <List.Item>该功能仅支持桌面端浏览器。</List.Item>
        <List.Item>在浏览器劫持视频播放的情况下，该功能无法使用。</List.Item>
      </List>
    </Col>
  </Row>
})();

const qualityApi = (() => {
  return <Row>
    <Col>
      <Title>自适应码流播放说明</Title>
      <List type="bullet">
        <List.Item>HLS 规范的 Master Playlist 可以根据网络速度自适应码率播放，在视频下载过程中，如果网络速度满足下载高码率的 TS 分片时，播放器将切换播放高码率的 TS 分片，反之播放低码率的 TS 分片。移动端和桌面端大部分浏览器都支持该特性。
</List.Item>
        <List.Item>自适应码率播放全端都默认采用自动切换逻辑。</List.Item>
        <List.Item>由于部分浏览器没有提供相应的接口和不支持 MSE，这些浏览器无法手动选择特定的清晰度，也不会显示切换清晰度的选项。</List.Item>
        <List.Item>Flash 播放模式下不支持手动选择特定的码率。</List.Item>
      </List>
    </Col>
  </Row>
})();


const levelSwitchTips = (() => {
  return <Row>
    <Col>
      <Title>清晰度切换提示说明</Title>
      <List type="bullet">
        <List.Item>在播放器初始化时可开启清晰度切换提示开关，详见代码示例。</List.Item>
      </List>
    </Col>
  </Row>
})();


const key = (() => {
  return <Row>
    <Col>
      <Title>Key 防盗链说明</Title>
      <List type="bullet">
        <List.Item>开启流程请参见 <a href="https://cloud.tencent.com/document/product/266/14047" target="_blank">Key 防盗链</a>。</List.Item>
        <List.Item>参数 psign 即超级播放器签名，其具体含义请参见  <a href="https://cloud.tencent.com/document/product/266/42436" target="_blank">超级播放器签名</a>。</List.Item>
      </List>
    </Col>
  </Row>
})();

const trial = (() => {
  return <Row>
    <Col>
      <Title>试看说明</Title>
      <List type="bullet">
        <List.Item>使用试看功能需要先开启 Key 防盗链，开启流程请参见 <a href="https://cloud.tencent.com/document/product/266/14047" target="_blank">Key 防盗链</a>。</List.Item>
        <List.Item>播放器播放的视频时长是 exper 参数指定的长度，与已往在播放端控制播放时长的试看功能不同，播放器不会获取完整的视频。</List.Item>
        <List.Item>试看时长是根据视频关键帧进行裁剪，实际截取的试看时长可能会比设定值少。</List.Item>
        <List.Item>开启试看后播放器仍会显示视频原始时长（在 Chrome 和 Firefox 播放 HLS 格式的试看视频会显示试看时长）。</List.Item>
      </List>
    </Col>
  </Row>
})();

const fileStatistic = (() => {
  return <Row>
    <Col>
      <Title>统计信息说明</Title>
      <List type="bullet">
        <List.Item>开启右键菜单打开视频统计信息选项。</List.Item>
        <List.Item>该功能仅支持桌面端浏览器。</List.Item>
        <List.Item>在浏览器劫持视频播放的情况下，该功能无法使用。</List.Item>
      </List>
    </Col>
  </Row>
})();


const customError = (() => {
  return <Row>
    <Col>
      <Title>自定义提示文案说明</Title>
      <List type="bullet">
        <List.Item>当您想要自定义提示文案时，可以通过初始化参数 languages 设置指定的提示文案，详见示例代码</List.Item>
      </List>
    </Col>
  </Row>
})();


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
} 
