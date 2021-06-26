<template>
  <div class="workBench">
    <el-row :gutter="15">
      <el-col :span="10">
        <el-card shadow="hover">
          <div class="basic-info-container">
            <el-avatar :src="require('@/assets/images/avatar.png')" shape="circle" :size="100" />
            <p class="info-name">贪吃的猫</p>
            <p class="info-desc">一个热爱前端开发，乐于分享的大学僧</p>
            <a
              class="info-qq__button"
              href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=751551976&website=www.oicqzone.com"
              target="_blank"
            >
              <svg-icon name="qq" size="md" color="#fff" />
              <span>753428092</span>
            </a>
            <div class="info-other">
              <p>
                <svg-icon name="user" size="lg" :color="variables.INFO" />
                <span>前端菜鸟</span>
              </p>
              <p>
                <svg-icon name="calendar" size="lg" :color="variables.INFO" />
                <span>2021/02/19</span>
              </p>
              <p>
                <svg-icon name="man" size="lg" :color="variables.INFO" />
                <span>男童鞋</span>
              </p>
              <p>
                <svg-icon name="location" size="lg" :color="variables.INFO" />
                <span>中国 • 湖北省 • 武汉市</span>
              </p>
              <p>
                <svg-icon name="code" size="lg" :color="variables.INFO" />
                <span>JavaScript、TypeScript、Vue、Node</span>
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card class="detail-card" shadow="hover">
          <template #header>
            <span class="detail-card__title">配套博文</span>
          </template>
          <ul class="detail-card__content">
            <template v-for="blog in blogs" :key="blog.blogId">
              <li>
                <a target="_blank">
                  {{ Blog.TITLE_COMMON + blog.title }}
                </a>
              </li>
            </template>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import variables from '@/assets/styles/variables.scss'
import Consts from '@/consts'

export default defineComponent({
  name: 'Workbench',
  setup() {
    const { Blog } = Consts
    const blogs = reactive([
      {
        title: '前言',
        blogId: '115752533'
      },
      {
        title: '项目搭建',
        blogId: '115151786'
      },
      {
        title: 'vue-router与vuex',
        blogId: '115152322'
      },
      {
        title: 'element-plus按需引入与动态换肤',
        blogId: '115167296'
      },
      {
        title: '如何优雅地使用Svg图标',
        blogId: '115842013'
      },
      {
        title: '侧边导航栏（上）',
        blogId: '115180335'
      },
      {
        title: '侧边导航栏（下）',
        blogId: '115250224'
      },
      {
        title: '多级路由缓存',
        blogId: '115896119'
      },
      {
        title: '头部工具栏（上）',
        blogId: '115280903'
      },
      {
        title: '头部工具栏（中）',
        blogId: '115352423'
      },
      {
        title: '头部工具栏（下）',
        blogId: '115356537'
      }
    ])

    const summary = ref([
      `为什么要做这么个项目呢？其实是因为前段时间在给一个企业做一个<b>后台管理系统</b>，然后就萌生了造轮
      子的想法。虽然，已经有<b>很多大佬</b>做出了很多很漂亮、功能丰富的模板，但是因为功能的凝练度太高，
      导致自己修改起来有些困难。同时有很多<b>新手</b>，自己去看那些大佬的源码是看不懂的。`,
      `所以，我只将<b>基础部分的架构</b>，以及会用到的<b>知识点</b>总结出来，写成了这样一个项目。使用它
      的人，可以在这个的基础之上，忽视这些前端效果的实现，更专心的去编写自己的业务代码。`,
      `同时，为了能让更多的人学会如何去编写这样一个后台系统管理模板，我写了<b>多篇博文</b>，专门为这个项
      目服务。想深入了解的同学可以去看一看（就是上面那些配套博文）。`,
      '最后，介绍一下我自己吧。',
      `我是一个正在上大学的<b>穷酸学生</b>，快上大四了。平时比较喜欢鼓捣这些花里胡哨的前端的东西（其实后
      端也没有忽视啦）。因为快要大四了，也就意味着就快要毕业找工作了，所以开始写一些开源的东西（以前也在DC
      loud的插件市场中发布过一些插件，名字都是wyb开头的），提升一下简历的的可观度。所以，大家如果觉得我的
      努力帮助你<b>减少了工作量</b>，亦或是你通过我的项目<b>学到了一些东西</b>，希望可以<b>star一下</
      b>项目（这对我很重要），或者右上角打赏一杯奶茶什么的，我也会很开心的。`,
      '最后，祝大家工作顺利，学习进步，笑口常开。'
    ])
    summary.value = summary.value.map((item) => item.replace(/\s/g, ''))

    return {
      variables,
      blogs,
      Blog,
      summary
    }
  }
})
</script>

<style lang="scss">
.workBench {
  .basic-info-container {
    @include flex(center, normal, column);
    padding: $space--lg;

    .info-name {
      margin-top: $space--lg;
      font-size: $font-size--2xl;
    }

    .info-desc {
      margin-top: $space--sm;
      font-size: $font-size--sm;
    }

    .info-qq__button {
      @include flex(center, center);
      cursor: pointer;
      margin-top: $space--lg;
      background-color: $color--primary;
      height: 30px;
      padding: 0 $space--md;
      border-radius: 9999px;
      color: $color--white;

      > span {
        font-size: $font-size--xs;

        &::before {
          content: ' ';
          display: inline-block;
          width: 5px;
        }
      }
    }

    .info-other {
      margin-top: $space--lg;
      width: 85%;

      p {
        @include flex(center, flex-start);
        width: 100%;
        margin-top: $space--sm;

        > span {
          font-size: $font-size--sm;

          &::before {
            content: ' ';
            display: inline-block;
            width: 5px;
          }
        }
      }
    }
  }

  .detail-card {
    height: 100%;

    .el-card {
      height: inherit;

      .el-card__body {
        padding-right: 0;
      }
    }

    .detail-card__title {
      font-size: $font-size--lg;
    }

    .detail-card__content {
      padding-right: 20px;

      li {
        line-height: 32px;

        &::before {
          content: '';
          width: 6px;
          height: 6px;
          display: inline-block;
          background-color: $color--info;
          border-radius: 100%;
          transform: translateY(-25%);
          margin-right: $space--sm;
        }
      }
    }
  }

  .describe-card {
    .describe-card__title {
      font-size: $font-size--lg;
    }

    .describe-card__content {
      position: relative;

      .github {
        position: absolute;
        top: -81px;
        right: -21px;
        border: 0;

        .octo-bg {
          fill: $color--primary;
        }

        &:hover {
          .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
          }
        }
      }

      p {
        margin-top: 10px;
        line-height: 25px;
        font-size: $font-size--sm;
        text-indent: 2em;

        &:first-of-type {
          margin-top: 0;
        }
      }
    }
  }

  .thanks-card {
    .thanks-card__title {
      font-size: $font-size--lg;
    }

    .thanks-card__content {
      small {
        line-height: 30px;
      }
    }
  }
}
</style>
