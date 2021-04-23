<template>
  <div class="upload-page container">
    <div class="bg-light"></div>
    <div class="banner-cont">
      <div class="top-to-gpstore" @click="openVskit({},'activity')">Download Vskit <img class="to-gp-right" src="../assets/img/upload/to_gp_right.png" alt="" srcset=""></div>
      <div class="banner-bg"></div>
    </div>

    <div class="main-cont">
      <div class="main-shadow">1</div>
      <div class="top-box">
        <!-- tip1 -->
        <div class="tip1-cont-title">
          <div class="tip1-circle">1</div>
          <div class="tip1-detail"><span class="weight-span">Download</span> your favorite status from the social media</div>
        </div>
        <img class="tip1-img" src="../assets/img/upload/tip1_img.png" alt="" >

        <!-- tip1 -->
        <div class="tip1-cont-title tip-cont-titleauto">
          <div class="tip1-circle tip2-circle" >2</div>
          <div class="tip1-detail tip-cont-detailauto"><span class="weight-span">Upload picture or video</span> to us.</div>
        </div>
        <div class="tip2-cont">
          <img class="top-img-bg" src="../assets/img/upload/tip1_detail_bg.png" alt="">

          <div class="upload-box">
             <van-uploader
              :before-read="beforeRead"
              :after-read="afterRead"
              accept
              :max-size="50 * 1024 * 1024"
              :max-count="1"
              @oversize="onOversize"
            >
              <div class="upload-btn-cont">
                <img class="upload-arrow-icon" src="../assets/img/upload/upload_arrow.png" alt="">
                <div class="before-upload" v-if="!showReloadStr && vsUploadNum <=0 ">Upload Status</div>
                <div class="before-upload" v-if="!showReloadStr && vsUploadNum >0">Upload More</div>
                <div v-if="showReloadStr" class="before-upload">Re-upload</div>
              </div>
            </van-uploader>
          </div>

          <div class="btn-tip-cont">
            <div class="success-num" v-if="vsUploadNum >0 ">successfully uploaded {{vsUploadNum}}</div>
          </div>
        </div>
      </div>
      <!-- tip3 -->
      <div class="box-bottom-box">
        <div class="tip3-cont-title">
          <div class="tip3-circle">3</div>
          <div class="tip3-detail">About&nbsp;<span class="weight-span">prize.</span> </div>
        </div>
        <img src="../assets/img/upload/tip3_detail.png" class="tip3-detail" alt="" srcset="">
      </div>
    </div>

    <div class="rules-cont">
      <div class="rules-cont-top">
        <h4 class="rules-title">Activity Rules</h4>
      </div>
      <div class="rules-detail-str">
        <p>1.<span class="gold-span">Download status</span>  or story you like or feel interesting from social apps such as <span class="gold-span">WhatsApp</span> and <span class="gold-span">Instagram</span>, upload it to the link, and simply fill in the source and reason for your favorite.</p>
        <p>2.We will select from them. The principle of selection is non-repetitive and high-quality. We will reward you $0.50 for each selected status. Or recharge the same amount of phone bill for you.</p>
        <p>3.If there are multiple favorite Status, you can <span class="gold-span">upload</span>  multiple times and each person can receive up to <span class="gold-span">$5</span>.</p>
        <p>4.The deadline for the event is 2021.1.31, and the deadline for awards is 2021.2.5.</p>
        <p>5.The ultimate power of interpretation belongs to Vskit.</p>
      </div>
    </div>

    <!-- faile mask -->
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
  import { Toast, Uploader ,Dialog } from "vant";
  import {DropdownMenu ,DropdownItem } from "vant"
  import { CountDown } from "vant";
 
  Vue.use(CountDown);
  Vue.use(Toast);
  Vue.use(Uploader);
  Vue.use(Dialog);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  

export default {
  data() {
    return {
      isUploadStr: null,
      // 弹窗
      showFailedMask :true,
      canMaskClickClose: false,
      showMaskName: null,
      isShowMask: false ,
      // upload失败 re-upload文案
      showReloadStr :false,
      // 进度toask对象
      uploadToaskObj:null,
      // 资源
      videoSource:"",
      // 已经上传的num
      vsUploadNum:0,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(function(vm) {
      document.title = "Upload Status";
    });
  },
  mounted() {
    const { from } = this.$route.query;
    if(from !== "down-info"){
      this.$Indicator.open({
        text: "Loading...",
        spinnerType: "triple-bounce"
      });
      setTimeout(() => {
        this.$Indicator.close();
      }, 1000);
    } 
    this.vsUploadNum =  localStorage.vsUploadNum ? Number(localStorage.vsUploadNum) :0  ;
  },
  methods: {
    failedSureFun() {
      this.closeMask();
    },
    showFiledMask() {
      Toast.clear();
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
      window.open(
        "https://play.google.com/store/apps/details?id=com.yomobigroup.chat"
      );
    },
    // 超过大小限制
    onOversize(file) {
      console.log(file);
      this.$Toast("Oops! The video is too big, please below 50M.");
    },
    // 上传前 校验
    beforeRead(file) {
      // console.log("before-file", file);
      const { size, type } = file;
      let name =  file.name.toLowerCase();
      const picRegStr = /\.(png|jpg|jpeg|gif|webp|raw)$/;
      const vedioRegStr = /\.(avi|mp4|mov)$/;
      if (picRegStr.test(name)) {
        if (size < 10 * 1024 * 1024) {
          this.fileType = "img";
          return true;
        }
        // 图片过大
        this.fileType = "";
        this.$Toast("Oops! The picture is too big, please below 10M.");
        return false;
      } else if (vedioRegStr.test(name)) {
        if (size < 50 * 1024 * 1024) {
          this.fileType = "vedio";
          return true;
        } 
        // 视屏过大
        this.fileType = "";
        this.$Toast("Oops! The video is too big, please below 50M.");
        return false;
      } else {
        // 格式不对
        this.$Toast("Please choose JPG/JPEG, PNG, GIF or RAW, AVI, MP4, MOV format.");
        return false;
      }
      // JPG/JPEG、PNG、GIF
      // RAW、AVI、MP4、MOV
    },
    // 读取完 文件之后
    afterRead(file) {
      const that = this;
      let params = new FormData();
      this.isUploadStr = "uploading";
      // 此时可以自行将文件上传至服务器
      params.append("file", file.file);
      this.uploadToaskObj = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: 'upload 0%',
      });
      let beforeTime = new Date().getTime();
      this.$Api.post(
          "https://opr-activity.vskit.tv/vskit/activity/talent-rank/file/upload",
          params,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
              if (progressEvent.lengthComputable) {
                let complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                if(complete > 1 && complete < 100){
                  that.uploadToaskObj.message = `uploading ${complete}%`
                }else if(complete > 99){
                  that.uploadToaskObj.message = `uploading 99%`;
                  // console.log( new Date().getTime() )
                }
              }
            }
          }
        )
        .then(resObj => {
          return resObj.data;
        })
        .then(({ code, data, msg }) => {
          let endTime = new Date().getTime();
          if(code === 0){
            Toast.clear();
            const { image_url , video_frame1_url ,video_url} = data;
            this.showReloadStr = false;
            this.$router.push({
              path:'/down-info',
              query :{
                image_url: encodeURIComponent(image_url),
                video_frame1_url:encodeURIComponent(video_frame1_url),
                video_url:encodeURIComponent(video_url),
                sourseType: this.fileType,
              }
            });
          }else{
            if(endTime - beforeTime < 2000 ){
              setTimeout(()=>{
                this.showFiledMask();
              },2000)
            }else{
              this.showFiledMask();
            }
          }
        })
        .catch(err => {
          let endTime = new Date().getTime();
          if(endTime - beforeTime < 2000 ){
            setTimeout(()=>{
              this.showFiledMask();
            },2000)
          }else{
            this.showFiledMask();
          }
        });
    },
    openVskit (rowdata, str) {
      this.video_id = "0";
      this.duet_id = "0";
      let shareTypeStr = 'share_copy_link';
      switch (this.shareType) {
        case 1:
          shareTypeStr = 'share_facebook';
          break;
        case 2:
          shareTypeStr = 'share_copy_link ';
          break;
        case 3:
          shareTypeStr = 'share_twitter';
          break;
        case 4:
          shareTypeStr = 'share_whatsapp';
          break;
        default:
          shareTypeStr = 'share_copy_link';
          break;
      }
      var config = {
        /* scheme:必须 */
        scheme_IOS: this.$iG.getSchemeIosUrl(),
        intent_str: '',
        intent_start_str: 'intent://com.yomobigroup/notify#Intent;package=com.yomobigroup.chat;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;scheme=vskit;',
        intent_start_first_str: 'intent://com.yomobigroup/notify',
        intent_start_second_str: '#Intent;package=com.yomobigroup.chat;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;scheme=vskit;',
        intent_end_str: 'end;',
        scheme_Adr: '',
        // vskit://com.yomobigroup/notify?type=web_operate_activity&share_url=https%3A%2F%2Fwww.baidu.com
        common_scheme_Adr: 'vskit://com.yomobigroup/notify?type=',
        // common_scheme_Adr: 'vskit://share.vskit.tv/vskit/share',
        // download_url: 'https://play.google.com/store/apps/details?id=com.yomobigroup.chat&referrer=utm_source=google_play&utm_campaign=campaign_id=comedyShow&utm_medium=' + shareTypeStr +'&utm_content=user_id=' + this.userid,
        download_url_one: 'https://play.google.com/store/apps/details?id=com.yomobigroup.chat&referrer=',
        download_url: `utm_source%3dgoogle_play%26utm_campaign%3dcampaign_id%253d${this.Config.ACTIVITY_ID}%26utm_medium%3d` + encodeURIComponent(shareTypeStr)  +'%26utm_content%3duser_id%253d' + encodeURIComponent(this.userid),
        download_ios_url: 'itms-apps://itunes.apple.com/us/app/vskit/id1450785631?mt=8',
        download_url_encode: '',
        timeout: 2000
      };

      config.download_url_encode = config.download_url_one +  encodeURIComponent(config.download_url);
      var ua = navigator.userAgent.toLowerCase();

      // 判断是什么端
      if (ua.indexOf('os') > 0) {
        if (str === 'info') {
          config.scheme_Adr = config.common_scheme_Adr + 'web&userid=' + rowdata.userId
        }
        if (str === 'activity') {
          config.scheme_Adr = config.common_scheme_Adr + 'web&share_url=' + "vskit%3a%2f%2fcom.yomobigroup%2fnotify%3ftype%3dweb"
        }
        var startTime = Date.now();
        window.location = config.scheme_Adr;

        var t = setTimeout(function () {
          var endTime = Date.now();
          if (!startTime || endTime - startTime < config.timeout + 200) {
            window.location = config.download_ios_url;
          }
        }, config.timeout);
      } else {
        //  无端内页面直接 打开客户端视频主页
        if (str === 'activity') {
          config.intent_str = config.intent_start_first_str +
            '?type=web&share_url=' + 'vskit%3a%2f%2fcom.yomobigroup%2fnotify%3ftype%3dweb'  + config.intent_start_second_str +
            'S.type=web;S.share_url=' + 'vskit%3a%2f%2fcom.yomobigroup%2fnotify%3ftype%3dweb' + ';';
        }
        // window.loaction = ((config.intent_str + 'S.browser_fallback_url=' + config.download_url_encode + ';' + config.intent_end_str));
        window.open(config.intent_str + 'S.browser_fallback_url=' + config.download_url_encode + ';' + config.intent_end_str);
      }
    },
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