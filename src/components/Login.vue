<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 图标区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png">
            </div>
            <!-- 表单区域 -->
            <el-form :model="loginForm" ref="loginFormRef" class="login_form" label-width="0px">
                <el-form-item>
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登陆</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginForm: {
                username: 'admin',
                password: '123456'
            }
        }
    },
    methods: {
        resetLoginForm() {
            //this.$refs.loginFormRef.resetFields();
            this.loginForm.username='';
            this.loginForm.password='';
        },
        async login(){
            const {data: res} = await this.$http.post('login', this.loginForm);
           // console.log(result.data);
           if(res.meta.status !== 200) return this.$message.error('登录失败！');
           this.$message.success('登录成功~');
           window.sessionStorage.setItem("token", res.data.token); // 保存token到本地
           this.$router.push('/home');
        }
    }
};
</script>

<style lang="less" scoped>
.login_container{
    background-color:#2b4b6b;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}

.avatar_box{
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}

.btns{
    display: flex;
    justify-content: flex-end;
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
   // border: 2px solid #2b4b6b;
}

</style>
