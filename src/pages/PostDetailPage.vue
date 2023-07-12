<template>
    <div class="post-detail">
        <div class="user-header">
            <img class="avatar" :src="post.createUser?.avatarUrl" alt="" />
            <div class="user-info">
                <div class="user-name">{{ post.createUser?.username }}</div>
                <button class="follow-button">关注</button>
            </div>
        </div>
        <div class="post-content">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-body" v-html="post.content"></div>
            <div class="post-footer">
                <div class="create-time">{{ post.createTime }}</div>
                <div class="comment-divider"></div>
                <div class="comment-summary">
                    共 {{ commentList.length }} 条评论 | 查看全部评论
                </div>
            </div>
        </div>
        <div class="comment-container">
            <div class="comment-list">
                <div v-for="comment in commentList" :key="comment.id" class="comment-card">
                    <img class="avatar" :src="comment.user.avatarUrl" alt="" />
                    <div class="comment-body">
                        <div class="comment-header">
                            <div class="user-name">{{ comment.user.username }}</div>
                            <div class="comment-time">{{ comment.createTime }}</div>
                        </div>
                        <div class="comment-content">{{ comment.content }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PostType } from '../models/post'
import { defineProps, ref, onMounted } from 'vue'
import myAxios from '../plugins/myAxios.ts'
import { Toast } from 'vant'

interface Props {
    postId: number
}

const props = defineProps<Props>()

const post = ref<PostType>(null)
const commentList = ref<CommentType[]>([])

// 添加此处代码
const getPostDetail = async () => {
    try {
        const res = await myAxios.get(`/discuss/detail/${props.postId}`)
        if (res.code === 0) {
            post.value = res.data
        } else {
            Toast.fail('获取帖子详情失败')
        }
    } catch (error) {
        console.log(error)
    }
}

// 页面加载时只触发一次
onMounted( () => {
    getPostDetail();
})
</script>

<style scoped>
.post-detail {
    max-width: 800px;
    margin: 0 auto;
}

.user-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
}

.user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
}

.user-name {
    font-size: 16px;
    font-weight: bold;
}

.follow-button {
    padding: 8px 16px;
    background-color: #67c23a;
    color: #fff;
    border-radius: 16px;
    font-size: 14px;
    cursor: pointer;
    border: none;
}

.post-content {
    margin-bottom: 20px;
}

.post-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.post-body {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    margin-bottom: 20px;
}

.post-footer {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #999;
}

.create-time {
    margin-right: 10px;
}

.comment-divider {
    width: 1px;
    height: 12px;
    background-color: #999;
    margin-right: 10px;
}

.comment-summary {
    cursor: pointer;
}

.comment-container {
    margin-bottom: 20px;
}

.comment-card {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
}

.comment-card .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
}

.comment-card .comment-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
}

.comment-card .comment-time {
    font-size: 12px;
    color: #999;
}

.comment-card .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.comment-card .comment-content {
    font-size: 14px;
    line-height: 1.8;
    color: #333;
}
</style>
