<template>
  <div>
    <!-- 头部navbar -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" ref="file" @change="photoChange" hidden />
    <!-- 头像 -->
    <van-cell title="头像" is-link @click="pCellClick">
      <template>
        <van-image class="van-img" :src="user.photo" round fit="cover" />
      </template>
    </van-cell>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isNameShow = true"
    />
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 1 ? '男' : '女'"
      @click="isGenderShow = true"
    />
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isBirthdayShow = true"
    />
    <!-- 昵称弹出层 -->
    <van-popup
      class="name-container"
      v-model="isNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UserName
        @close="isNameShow = false"
        :user="user"
        v-if="isNameShow"
      ></UserName>
    </van-popup>
    <!-- 性别弹出层 -->
    <van-popup
      class="name-container"
      v-model="isGenderShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <UserGender
        @close="isGenderShow = false"
        :user="user"
        v-if="isGenderShow"
      ></UserGender>
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup
      class="name-container"
      v-model="isBirthdayShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <UserBirthday
        @close="isBirthdayShow = false"
        :user="user"
        v-if="isBirthdayShow"
      ></UserBirthday>
    </van-popup>
    <!-- 头像弹出层 -->
    <van-popup
      class="name-container"
      v-model="isPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UserPhoto
        @close="isPhotoShow = false"
        v-if="isPhotoShow"
        :url="url"
        @updatePhoto="user.photo = $event"
      ></UserPhoto>
    </van-popup>
  </div>
</template>

<script>
import UserName from "./components/user-name.vue";
import UserGender from "./components/user-gender.vue";
import UserBirthday from "./components/user-birthday.vue";
import UserPhoto from "./components/user-photo.vue";
import { getInfoAPI } from "@/api";
export default {
  data() {
    return {
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false,
      user: {},
      url: "",
    };
  },
  components: {
    UserName,
    UserGender,
    UserBirthday,
    UserPhoto,
  },
  created() {
    this.getInfo();
  },
  methods: {
    // 获取用户的信息、
    async getInfo() {
      try {
        const { data } = await getInfoAPI();
        //  console.log(data)
        this.user = data;
      } catch (err) {
        this.$toast.fail("获取用户基本信息失败");
      }
    },
    photoChange() {
      // 生成url
      const file = this.$refs.file.files[0];
      const url = window.URL.createObjectURL(file);
      this.url = url;
      // console.log(typeof(url))
      // 弹出头像组件
      this.isPhotoShow = true;
      // 随后将file的value清空，不然下次选同样的图片不会触发change事件
      this.$refs.file.value = "";
    },
    // 点击头像cell单元格
    pCellClick() {
      this.$refs.file.click();
    },
  },
};
</script>
<style  scoped lang="less">
/deep/ .navbar {
  background-color: #1f84eb;
  .van-nav-bar__title,
  .van-icon {
    color: #fff !important;
  }
}
.van-img {
  width: 30px;
  height: 30px;
}
.name-container {
  background-color: #f5f3f3;
}
</style>