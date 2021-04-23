<template>
  <div class="upload-page-info container">
    <div class="upload-img-cont">
      <div class="input-tip-title">
        <div class="circle-cont">1</div>
        <sapn class="weight-icon">*</sapn>
        <p>Favorite Status (Required) </p>
      </div>
      <img :src="imgUrl" alt="">
      <van-form
        class="form-cont" 
        @submit="onSubmit"
        @failed="submitFailed"
        validate-trigger="onSubmit"
        validate-first
      >
        <div class="input-tip-title">
          <div class="circle-cont">2</div>
          <sapn class="weight-icon">*</sapn>
          <p>Source of Status (Required) </p>
        </div>
        <div class="source-input-cont">
          <van-field
            readonly
            class="input-item"
            v-model="sourceFromValue"
            placeholder="source from"
            right-icon="arrow-down"
            :rules="[{ required: true, }]"
            @click="sourceSelectFnun('sourceSelect')"
            name="source"
          />
          <van-field
            maxlength="20"
            class="input-item"
            v-if = "sourceFromValue === 'Others'"
            v-model="sourceOthersDetail"
            placeholder="Please fill in"
            :rules="[{ required: true }]"
            name="sourceExtra"
          />
        </div>

        <div class="input-tip-title">
          <div class="circle-cont">3</div>
          <sapn class="weight-icon">*</sapn>
          <p>Type of Status (Required) </p>
        </div>
        <div class="source-input-cont">
          <van-field
            readonly
            class="input-item"
            v-model="typeStatus"
            placeholder="Type"
            right-icon="arrow-down"
            :rules="[{ required: true }]"
            @click="sourceSelectFnun('typeStatusSelect')"
            name="typeStatus"
          />
          <van-field
            maxlength="20"
            class="input-item"
            v-if = "typeStatus === 'Others'"
            v-model="typeStatusOtherDetail"
            name="typeStatusExtra"
            placeholder="Please fill in"
            :rules="[{ required: true,}]"
          />
        </div>

        <div class="input-tip-title">
          <div class="circle-cont">4</div>
          <p>Reasons for choosing it.</p>
        </div>
        <div class="source-input-cont">
          <van-field
            rows="3"
            class="input-item"
            v-model="reasonsDetail"
            placeholder="Up to 200 words."
            maxlength="200"
            type="textarea"
          />
        </div>
        
        <div class="input-tip-title" style="marginBottom:0">
          <div class="circle-cont">5</div>
          <sapn class="weight-icon">*</sapn>
          <p>Your phone number.</p>
        </div>
        <p class="receive-p">(Required- For receiving prize)</p>

        <div class="input-phone-cont">
          <van-field
            readonly
            :default-index="2"
            class="country-select"
            v-model="phoneCountry"
            placeholder="Select"
            right-icon="arrow-down"
            :rules="[{ required: true}]"
            @click="sourceSelectFnun('phoneCountry')"
          />
          <van-field
            type="number"
            class="phone-number-input"
            v-model="phoneNumber"
            placeholder="Please fill in phone number"
            name="phoneNumber"
            :rules="[{ pattern:pattern ,trigger:'onBlur',}]"
          />
        </div>

        
        <div class="submit-cont" style="margin: 16px;">
          <van-button class="submit-btn" round block type="info" native-type="submit">Submit</van-button>
        </div>
      </van-form>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="renderSelectColums"
        @cancel="showPicker = false"
        @confirm="sourceConfirmFun"
        @change="changeSelect"
        confirm-button-text="Sure"
        cancel-button-text="cancel"
      />
    </van-popup>
  </div>
</template>



<script>
import Vue from 'vue';
import { Button,Toast ,Uploader} from 'vant';
import { CountDown } from 'vant';
import { Popup } from 'vant';
import { Picker ,Form ,Field} from 'vant';

Vue.use(Picker);  
Vue.use(Popup);
Vue.use(Button);
Vue.use(CountDown);
Vue.use(Toast);
Vue.use(Uploader);
Vue.use(Form);
Vue.use(Field);

export default {
  data () {
    return {
      isUploadStr:null,
      countryOptions: [
        // 开始
        'NG +234',
        'KE +254',
        'GH +233',
        'CI +225',
        'SN +221',
        'TZ +255',
      ],
      showPicker:false,
      selectType :null, // 选择的type
      sourceColumns: ['Whatsapp', 'Instagram', 'Snapchat', 'Others',],
      typeStatusColumns: ["Meme","News","Record life","Blessings","Others"],
      renderSelectColums:[],
      // form 表单
      sourceFromValue :"",
      sourceOthersDetail :"",
      typeStatus : "",
      typeStatusOtherDetail : "",
      reasonsDetail :"" , //  非必填
      phoneNumber : "" ,
      phoneCountry:"NG +234",
      // 文件类型
      fileType: "",
      pattern:/^\d{8,12}$/,
      // 传递过来的资源
      sourseType : "",
      sourceUrl : "",
      imgUrl : "",
      // 是否正在上传
      isUpdateInfoIng:false,
    }
  },
  beforeRouteEnter (to, from, next) {
    next(function (vm) {
      document.title = 'Upload Info';
    });
  },
  mounted(){
    this.phoneNumber  = localStorage.vsPhoneNumer || "";
    // console.log("$route",this.$route);
    const {image_url, video_url, video_frame1_url, sourseType} = this.$route.query;
    this.sourseType = sourseType;
    if(image_url){
      this.sourceUrl = decodeURIComponent(image_url);
      this.imgUrl = decodeURIComponent(image_url);
    }else{
      this.sourceUrl = decodeURIComponent(video_url);
      this.imgUrl = decodeURIComponent(video_frame1_url);
    }
  },
  methods: {
    // 手机长度检测
    validatorPhone(value){
      console.log("正则长度！")
      let reg = /^\d{8,12}$/;
      return reg.test(value);
    },
    // select 选择
    sourceSelectFnun(type){
      if(type === "sourceSelect"){
        this.selectType = "sourceSelect";
        this.renderSelectColums = this.sourceColumns;
      }else if( type === "typeStatusSelect"){
        this.selectType = "typeStatusSelect";
        this.renderSelectColums = this.typeStatusColumns;
      }else if( type === "phoneCountry"){
        this.selectType = "phoneCountry";
        this.renderSelectColums = this.countryOptions;
      }
      this.showPicker = true;
    },
    onSubmit(){
      if(this.isUpdateInfoIng){
        return
      }else{
        this.isUpdateInfoIng = true;
      }
      let sourceList =  ['Whatsapp', 'Instagram', 'Snapchat', 'Others'] ;
      let typeStatusList = ["Meme","News","Record life","Blessings","Others"];
      let sourceIndex =  sourceList.indexOf(this.sourceFromValue) + 1;
      let type_extraIndex =  typeStatusList.indexOf(this.typeStatus) + 1;
      let pccIndex = this.phoneCountry.indexOf("+");
      let pcc =  pccIndex > 0 ? this.phoneCountry.slice(pccIndex) :"";
      let data = {
        file_link: this.sourceUrl,
        source : sourceIndex,
        source_extra : this.sourceOthersDetail,
        type : type_extraIndex,
        type_extra: this.typeStatusOtherDetail,
        reason: this.reasonsDetail,
        pcc,
        phone: this.phoneNumber,
      }
      let params = new FormData();
      for(let key in data){
        params.append(`${key}`, data[key]);
      }
      this.$Api.post("https://opr-activity.vskit.tv/vskit/activity/talent-rank/status/collect",
        params,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        }
      )
      .then(resObj => {
        return resObj.data;
      })
      .then(({ code, data, msg }) => {
        if(code === 0){
          localStorage.vsUploadNum = localStorage.vsUploadNum ? Number(localStorage.vsUploadNum) + 1 : 1;
          Toast.success("Submitted successfully!");
          this.$router.push({ 
            path:'/',
            query:{
              from:"down-info"
            }
          });
          localStorage.vsPhoneNumer = this.phoneNumber;
        }else{
          Toast.fail("Failed to submit. Please try again!");
        }
        this.isUpdateInfoIng = false;
      })
      .catch(err => {
        this.isUpdateInfoIng = false;
        Toast.fail("Failed to submit. Please try again!");
      });
    },
    submitFailed(object,error){
      const { errors } = object ;
      if( errors.length === 1 && errors[0].name === "phoneNumber"){
        this.$Toast("Your phone number should fill in 8-12 digits.");
      }else{
        this.$Toast("Please complete the required fields.");
      }
      return false;
    },
    // change
    changeSelect(picker, value, index){
      this.sourceConfirmFun(value,index);
    },
    // sure
    sourceConfirmFun(value,index){
      switch (this.selectType) {
        case "sourceSelect":
          this.sourceFromValue = value;
          break;
        case "typeStatusSelect":
          this.typeStatus = value;
          break
        case "phoneCountry":
          this.phoneCountry = value;
        default:
          break;
      }
      this.showPicker = false;
      // console.log(`当前值：${value}, 当前索引：${index}`);
    },
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 750px;
    color: #ffffff;
  }
</style>