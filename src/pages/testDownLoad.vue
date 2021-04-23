<template>
  <div class="upload-page container">
    <div class="banner-cont">
      <h3 class="title-cont">下载测试页面</h3>
      <div class="upload-box">
        <van-uploader
          :before-read="beforeRead"
          :after-read="afterRead"
          accept="image/*,video/*"
          :max-size="50 * 1024 * 1024"
          :max-count="1"
          @oversize="onOversize"
        >
          <div class="upload-btn-cont">
            <div class="before-upload" v-if="!showReloadStr">Upload</div>
            <!-- <div class="uploading-btn">上传OK-文件</div>
            <div class="upload-down">成功文件</div> -->
            <div v-if="showReloadStr" class="upload-reload">Re-upload</div>
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="center-prompt-cont">
      <van-count-down :time="1000000" format="DD 天 HH 时 mm 分 ss 秒" />
      <ul class="center-toask">
        <li @click.stop="toSavePic(0)">
          <h3>图片下载到本地</h3>
        </li>
        <li @click.stop="toSavePic(1)"><h3>2M视频到本地</h3></li>
        <li @click.stop="toSavePic(2)"><h3>45M视频到本地</h3></li>
        <li @click.stop="closeWebView"><button style="color:#000000">点击关闭webview</button></li>
      </ul>
    </div>
    <div>
      <!-- <input type="file" style="display: block;" id="img-upload"  @change="selectImage"/> -->
    </div>
    <div class="rules-cont">
      <div class="rules-cont-top">
        <div>------------------</div>
        <h4 class="rules-title">Activity Rules</h4>
        <div>------------------</div>
      </div>
      <div class="rules-detail-str">
        <p>1.Download the status or story you like or feel interesting from social apps such as WhatsApp and Instagram, upload it to the link, and simply fill in the source and reason for your favorite.</p>
        <p>2.If there are multiple favorite Status, you can upload multiple times and each person can receive up to $5.</p>
        <p>3.We will select from them. The principle of selection is non-repetitive and high-quality. We will reward you $0.50 for each selected status. Or recharge the same amount of phone bill for you.</p>
        <p>4.The deadline for the event is 2021.1.31, and the deadline for awards is 2021.2.5.</p>
        <p>5.The ultimate power of interpretation belongs to Vskit.</p>
        <p>6.The ultimate power of interpretation belongs to Vskit.</p>
      </div>
    </div>

    <div class="mask-bg" v-if="isShowMask" @click="handleMaskBgClick">
      <div class="mtn-tc" v-if="showMaskName  === 'uploadFailed' " @click.stop>
        <div @click.stop>
          <h3 class="tit">Upload Failed</h3>
          <p class="cont">
            Upload may fail due to network or
            other reasons, please upload again.
          </p>
          <a href="javascript:;" class="mtn-btn-small" @click.stop="failedSureFun">Sure</a>
        </div>
        <a href="javascript:;" class="close-btn" @click.stop="closeMask"></a>
      </div>
    </div>
  </div>
</template>



<script>

  import Vue from "vue";
  import { createApp } from 'vue';
  import { Button, Toast, Uploader ,Dialog } from "vant";
  import {DropdownMenu ,DropdownItem } from "vant"
  import { CountDown } from "vant";
 
  Vue.use(Button);
  Vue.use(CountDown);
  Vue.use(Toast);
  Vue.use(Uploader);
  Vue.use(Dialog);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  

export default {
  data() {
    return {
      ruleUrl: "",
      uploadStrStatus: "upload",
      fileList: [],
      isUploadStr: null,

      // 弹窗
      showFailedMask :true,
      canMaskClickClose: false,
      showMaskName: null,
      isShowMask: false ,
      // upload失败
      showReloadStr :false,
      // 进度toask对象
      uploadToaskObj:null,
      // 资源
      videoSource:""
      // 视频：2M http://a.vskitcdn.com/V/bc1752de-8915-46b9-8753-302230b4c63f.mp4
      // 视频 45M  http://a.vskitcdn.com/V/7900de12-f26e-48bd-98ca-bb37f46fbd7a.mp4
      // 分享图 ： http://a.vskitcdn.com/PIC/3c9fdc58-b6e7-46ce-be98-fc1c31a7f609.png
    };
  },
  beforeRouteEnter(to, from, next) {
    next(function(vm) {
      document.title = "Rule";
    });
  },
  computed: {
    uploadRenderStr() {}
  },
  mounted() {
    this.$Indicator.open({
      text: "Loading...",
      spinnerType: "triple-bounce"
    });
    window.onResumeWebView = this.onResumeWebView;
    window.onNativeCallback = this.onNativeCallback;
    // Toast.loading({
    //   duration: 0, // 持续展示 toast
    //   forbidClick: true,
    //   message: '倒计时 3 秒',
    // });
    setTimeout(() => {
      this.$Indicator.close();
      console.log("window.onResumeWebView", window.onResumeWebView);
      // this.showFiledMask()
    }, 1000);
    
  },
  methods: {
    onNativeCallback(type , obj){
      console.log("执行到onNativeCallback,type:",type,"obj:",obj);
    },
    onResumeWebView(obj,){
      console.log("执行到onResumeWebView,obj:",obj);
    },
    // 关闭当前页
    closeWebView(){
       if(window.android && window.android.finish){
        window.android.finish()
      }else{
        console.log("无 finish方法！！！")
      }
    },
    toSavePic(typeNun){
      // 分享图 ： http://a.vskitcdn.com/PIC/3c9fdc58-b6e7-46ce-be98-fc1c31a7f609.png
      // 视频：2M http://a.vskitcdn.com/V/bc1752de-8915-46b9-8753-302230b4c63f.mp4
      // 视频 45M  http://a.vskitcdn.com/V/7900de12-f26e-48bd-98ca-bb37f46fbd7a.mp4
      let saveUrl = "";
      if(typeNun === 0 ){
        saveUrl = "http://a.vskitcdn.com/PIC/3c9fdc58-b6e7-46ce-be98-fc1c31a7f609.png";
      }else if(typeNun === 1 ){
        saveUrl = "http://a.vskitcdn.com/V/bc1752de-8915-46b9-8753-302230b4c63f.mp4"
      }else if(typeNun === 2){
        saveUrl = "http://a.vskitcdn.com/V/7900de12-f26e-48bd-98ca-bb37f46fbd7a.mp4"
        if(window.android){
          window.android.saveFile(saveUrl)
        }else{
          console.log("安卓无saveFile方法！！！")
        }
        console.log("type",typeNun)
        return ;
      }

      if(window.android){
        window.android.saveFile(saveUrl)
      }else{
        console.log("安卓无saveFile方法！！！")
      }
      console.log("type",typeNun)

    },
    failedSureFun() {
      console.log("确认关闭,显示reload");
      this.closeMask();
    },
    showFiledMask() {
      this.showReloadStr = true;
      this.isShowMask = true;
      this.showMaskName = "uploadFailed";
      this.showFailedMask = true;
    },
    // mask 点击关闭函数
    handleMaskBgClick() {
      if (this.canMaskClickClose) {
        this.closeMask();
      }
    },
    // 关闭弹窗
    closeMask(type) {
      this.canMaskClickClose = false;
      this.showMaskName = null;
      this.isShowMask = false;
      // 展示关闭
      this.showFailedMask = false;
    },
    toPlayStore() {
      console.log("去谷歌商店");
      window.open(
        "https://play.google.com/store/apps/details?id=com.yomobigroup.chat"
      );
    },
    drawImg() {
      var video, output;
      var scale = 0.8;

      output = document.getElementById("output");
      video = document.getElementById("video");
      video.addEventListener("loadeddata", captureImage);

      var captureImage = function() {
        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth * scale;
        canvas.height = video.videoHeight * scale;
        canvas.getContext("2d").drawImage(video, 0, 0, 400, 400);

        var img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        img.setAttribute("crossOrigin", "Anonymous");
        // console.log("img", canvas.toDataURL("image/png"));
        output.appendChild(img);
      };
    },
    // 超过大小限制
    onOversize(file) {
      console.log(file);
      Toast("大于2M 的提示内容！");
    },
    selectImage(file) {
      console.log("ok");
      console.log(file);
      console.log(file.content);
    },
    // 上传前 校验
    beforeRead(file) {
      console.log("before-file", file);

      const { name, size, type } = file;
      const picRegStr = /\.(png|jpg|jpeg|gif|webp)$/;
      const vedioRegStr = /\.(raw|avi|mp4|mov)$/;

      if (picRegStr.test(name)) {
        console.log("img---------");
        if (size < 10 * 1024 * 1024) {
          this.fileType = "img";
          return true;
        } else {
          this.fileType = "";
          this.$Toast("图片太大，请选择 < 10 M ！");
          return false;
        }
      } else if (vedioRegStr.test(name)) {
        console.log("vedio--------");
        if (size < 50 * 1024 * 1024) {
          this.fileType = "vedio";
          return true;
        } else {
          this.fileType = "";
          this.$Toast("视频太大了,vedio < 50M");
          return false;
        }
      } else {
        this.$Toast(" 请选择正确的视屏格式！");
        console.log("请上传图片 or 视屏--------");
        return false;
      }
      // JPG/JPEG、PNG、GIF
      // RAW、AVI、MP4、MOV
    },
    // 读取完 文件之后
    afterRead(file) {
      const that = this;
      this.isUploadStr = "uploading";
      // 此时可以自行将文件上传至服务器
      console.log("选择拿到的file", file);
      // 参数
      let params = new FormData();
      params.append("file文件", file.file);
      Toast.clear();
      return ;
      this.$Api.post(
          "https://api.mylichking.com/vskit/activity/talent-rank/file/upload",
          params,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
              if (progressEvent.lengthComputable) {
                var complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                console.log(progressEvent.loaded, progressEvent.total);
                console.log("上传%", complete);
                if (complete > 90) {
                  console.log("progressEvent",progressEvent);
                }
                if(complete > 1 && complete < 100){
                  that.uploadToaskObj.message = `uploading ${complete}%`
                }else if(complete > 99){
                  that.uploadToaskObj.message = `uploading 99%`;
                   console.log( new Date().getTime() )
                }
              }
            }
          }
        )
        .then(resObj => {
          console.log("上传中间结果", resObj);
          return resObj.data;
        })
        .then(({ code, data, msg }) => {
          Toast.clear();
          if(code === 0){
            this.showReloadStr = true;
            // 成功去成功的页面
            this.$router.push({
              name:'downInfo',
              params :{
                sourceUrl: encodeURI(data.url),
                imgUrl:encodeURI(data.url),
                sourseType: this.fileType,
              }
            });
            console.log( new Date().getTime() )
          }else{
            this.showFiledMask();
          }
        })
        .catch(err => {
          Toast.clear();
          this.showFiledMask();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 0;
  width: 750px;
  color: #ffffff;
}
</style>