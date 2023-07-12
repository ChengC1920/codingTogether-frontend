html
<!-- 第一个页面 -->
<template>
    <div class="post-card-list">
        <div v-for="post in props.postList" :key="post.id" class="post-card" @click="handleClickPost(post)">
            <div class="post-user-info">
                <img class="avatar" :src="post.createUser?.avatarUrl" alt="" />
                <div class="user-name">{{ post.createUser?.username }}</div>
                <div class="post-time">{{ post.createTime }}</div>
            </div>
            <div class="post-title">{{ post.title }}</div>
            <div class="post-content">{{ truncatedContent(post.content) }}</div>
            <div class="post-footer">
                <!-- ... -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PostType } from '../models/post'
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
interface Props {
    postList: PostType[]
}

const props = defineProps<Props>()

const handleClickPost = (post: PostType) => {
    router.push({ path: `/post/detail/${post.id}` })
}

const truncatedContent = (content: string) => {
    if (content.length > 40) {
        return content.substring(0, 40) + '...'
    }
    return content
}
</script>

<style scoped>
.post-card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin: 20px;
}

.post-card {
    width: calc(90% - 10px);
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.08);
}

.post-user-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 0; /* 将头像的 Margin-Left 设为 0，即将头像靠左显示 */
}

.user-name {
    font-size: 14px;
    color: #999;
    margin-right: 10px;
}

.post-time {
    font-size: 14px;
    color: #999;
}

.post-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.post-content {
    font-size: 14px;
    line-height: 1.8;
    color: #666;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.post-footer {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #999;
}

.post-user-info {
    display: flex;
    justify-content: flex-start; /* 将头像对齐到左边 */
    align-items: center;
    margin-bottom: 10px;
}
</style>
