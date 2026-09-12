<template>
  <div class="blog-list-item-container">
    <RouterLink class="a" :to="getPath(data.id)">
      <div class="item-image" v-if="data.thumb">
        <img v-lazy="data.thumb" :src="data.thumb" alt="" />
      </div>

      <div class="item-content">
        <div class="item-title">{{ data.title }}</div>
        <div class="item-info">
          <span class="create-date">
            {{ formatTimestamp(data.createDate) }}
          </span>
          <span class="scan-number"> 浏览:{{ data.scanNumber }} </span>
          <span class="comment-number"> 评论{{ data.commentNumber }} </span>
          <span class="category">
            {{ data.category.name }}
          </span>
        </div>
        <div class="item-description">
          <!-- {{ data.description }} -->
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque earum beatae voluptate
          at, eveniet sit sapiente natus, repellat quaerat aut recusandae, repellendus distinctio
          nostrum similique! Modi commodi iure cum nemo labore quibusdam aspernatur molestiae
          voluptatibus similique, tempora natus itaque sapiente ipsa nesciunt consequuntur dolore
          maiores dolorem provident, officiis praesentium tempore velit cupiditate. Consequuntur
          voluptas veniam distinctio beatae, provident illo! Quia quidem accusamus nesciunt
          praesentium similique voluptatibus quisquam consequuntur pariatur eius delectus ratione,
          vel, totam porro, laboriosam repudiandae mollitia libero velit nobis id illum tempore
          ducimus? Soluta fuga dicta quis nam totam iste esse cumque magni corrupti incidunt veniam
          reiciendis aspernatur ad, culpa debitis maiores, non accusamus? Distinctio alias, et cum
          enim fuga perspiciatis amet expedita delectus earum neque, provident cumque sequi, aliquid
          culpa laborum quod voluptates. Tempora voluptatibus voluptate ipsa. Aliquam, maiores
          dolores. Corrupti deserunt velit, voluptates illo non pariatur quia accusamus atque! Minus
          enim quasi, quidem soluta autem, omnis sequi est maiores vel cum architecto sint
          reiciendis. Fugiat, aliquam inventore quam repellat perferendis doloribus nemo dolore quos
          sapiente atque perspiciatis laborum consequatur quis, nulla itaque numquam accusantium?
          Eveniet rem ut ipsam quae esse voluptatibus quos quasi eos minima debitis tempora in
          cumque rerum molestias magni sapiente dolorem blanditiis reprehenderit eligendi sint,
          facilis doloremque itaque. Eius beatae totam, ea rem ab tenetur quia repellat possimus est
          distinctio doloremque cupiditate unde quaerat. Libero, neque placeat quasi accusamus unde
          recusandae repellendus amet. Dignissimos ea odit quasi velit accusamus nisi quo deserunt
          officiis! Odit officia numquam suscipit quae et possimus sint. Aut beatae culpa cumque
          magnam id harum sequi est, at aliquid eius autem optio quo rerum ab enim tempora,
          reprehenderit quia. Culpa, blanditiis. Magni rerum, tempore ea pariatur quod facere
          quaerat, exercitationem molestiae, delectus ducimus non eligendi illum nemo cum aspernatur
          quia libero. Accusamus aperiam nulla quis recusandae dignissimos iure esse numquam
          doloribus, vero eius quas asperiores quae neque veritatis molestias omnis sapiente
          deserunt animi at enim facere nobis optio fugiat! Distinctio, delectus quas harum ad culpa
          nihil. Assumenda voluptatem alias pariatur minus. Odio iusto itaque corrupti. Placeat
          temporibus laudantium, possimus cum earum nulla eveniet aliquam ullam nisi laborum unde
          deleniti labore ipsum dolor quas ipsam fugit illo porro atque veritatis nostrum voluptas?
          Numquam ex quas quos unde exercitationem, obcaecati totam ratione voluptatum. Dignissimos
          expedita, aliquam quia quis minima culpa ipsum obcaecati veniam harum aliquid impedit
          exercitationem, commodi ipsam explicabo. Quis corrupti aspernatur libero quasi fugit
          eveniet nostrum saepe perferendis, iste omnis aut veniam, blanditiis voluptatum aliquid
          labore ab esse. Quasi provident fugit dolore facere necessitatibus consectetur deleniti
          cupiditate quis maxime accusamus nisi adipisci libero dolorum ea, amet atque id vel odio
          animi qui fuga illum molestias! Alias, tenetur assumenda ab eaque fugiat corrupti quisquam
          consectetur architecto. Eos labore sunt cumque dolores corporis ea iusto inventore qui
          eligendi deserunt totam, culpa cupiditate error sed, pariatur odit quos, quae hic
          quibusdam. Reiciendis voluptatem at modi impedit inventore nihil necessitatibus
          laudantium? Blanditiis reprehenderit ipsa, aut eum hic quis enim corporis deserunt
          assumenda, molestiae mollitia dicta? Voluptas unde facere hic sit cupiditate ex, et
          laborum odio in eveniet aliquid dolorem pariatur quia illum sed consectetur esse?
          Asperiores ipsum quidem, nam exercitationem magni earum sed quisquam corporis quaerat et
          inventore. Voluptatum earum, eos neque consequatur architecto aliquam aspernatur vero quia
          perferendis quisquam qui! Voluptatem, atque enim? Deleniti quam atque optio, enim ea eos
          vero fugiat itaque quos, cupiditate eaque doloribus? Ipsa quia libero corporis perferendis
          alias exercitationem dolore quaerat, doloribus architecto cumque ad dolores officia
          cupiditate consequatur, vel et tempore accusamus iure. Ipsa delectus qui vitae tempore
          ullam dolor velit culpa quod esse rem. Nisi obcaecati similique tempora enim dolorum vel
          dicta voluptatum ipsum, deleniti laborum voluptates aliquid molestias asperiores
          architecto fuga laudantium ut fugiat minima harum, reiciendis repellat. Voluptatum ullam
          enim veniam totam debitis iste facilis modi excepturi, dolor quaerat optio magni ipsa, nam
          natus doloribus? Aliquid nulla dolore id laborum nihil quidem rerum neque iure itaque
          voluptate. Sed facere quam optio non amet, soluta voluptatibus fugiat reprehenderit
          placeat. Dignissimos, quisquam labore hic maiores debitis placeat ullam nesciunt
          voluptatum nulla distinctio! Adipisci deleniti dolor magnam praesentium. Voluptatem
          necessitatibus, voluptatibus quae optio placeat non provident! Quae expedita odit,
          repellendus soluta vero, provident assumenda delectus ipsum cum saepe maiores ullam quo?
          Quam explicabo voluptate cumque ducimus fugiat inventore error distinctio tempora natus
          perferendis, facilis sint eaque earum recusandae cupiditate molestias voluptates quia
          vero! Eos pariatur cupiditate nemo? Accusamus illo non, temporibus, mollitia corrupti amet
          fuga distinctio sed dolorum officia cumque eligendi. Labore exercitationem dolore ullam
          nam quia maxime culpa, rerum totam ipsum architecto a accusamus sunt laudantium ex
          laboriosam! Quia facilis dignissimos quos, iusto obcaecati ratione inventore soluta dolor
          blanditiis repudiandae consequatur illo debitis quibusdam ipsam, sit quod veritatis
          tempore modi ea. Iure assumenda ullam quas? Quae nam ducimus consequatur ea similique nisi
          tempora nesciunt! Sit doloremque consectetur, id in optio commodi officiis soluta,
          molestias eligendi quaerat nam a, nisi itaque officia tenetur quos repellat quasi impedit
          laborum laboriosam ullam cumque! Maiores, neque placeat. Voluptates, sint veniam facere,
          nihil ex ab reiciendis hic quibusdam iure quaerat maxime esse et fuga labore corrupti
          eveniet culpa aperiam sed minima! Voluptatem nihil fugit enim repellendus quidem esse
          deserunt saepe voluptas temporibus quam, laudantium quaerat soluta voluptate officia
          tempore alias dolorem minus nobis in suscipit cupiditate doloremque ea. Necessitatibus
          adipisci, vero accusamus est nihil dicta quaerat, magnam nemo recusandae reiciendis
          distinctio, possimus similique in? Accusantium molestias qui consequatur hic quam magnam
          tempora odit veritatis tempore nihil quasi ipsam sit, officia ab sequi quia harum! Eos
          sunt optio placeat quam ad eveniet veniam aliquam eum non quaerat recusandae voluptas
          eaque, mollitia provident dolor voluptates aperiam enim nesciunt quisquam quae corporis
          illo vero numquam. Quos, suscipit neque nam minima saepe omnis harum repudiandae
          perferendis laudantium sed labore illo dolor ratione totam quidem, delectus dolore eos
          odio. Animi veniam a sunt sint doloribus adipisci perferendis porro rem sequi earum
          tempora, labore nobis, ea voluptas ut, quis aspernatur. Maxime tenetur necessitatibus
          error consectetur repellendus iste ad! Vel laboriosam blanditiis pariatur non dolore quod
          ipsa eius facilis nostrum consectetur, eum dicta repellendus veniam? Quia, quasi
          similique?
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { type BlogListItem } from '@/api/blog'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { ROUTE_PATH } from '@/router/constants'

function getPath(id: string) {
  return `${ROUTE_PATH.BLOG}/detail/${id}`
}
interface Props {
  data: BlogListItem
}
defineProps<Props>()
</script>

<style scoped lang="scss">
@use '/src/styles/var';
$height: 200px;
$marginSize: 10px;
.blog-list-item-container {
  .a {
    padding: $marginSize;
    display: flex;
    border-bottom: 1px solid #000;
    height: $height;
  }
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  &:hover {
    z-index: 1;
    transform: translateY(-2px);
    box-shadow:
      0 -6px 14px rgba(0, 0, 0, 0.12),
      0 6px 14px rgba(0, 0, 0, 0.12);
  }

  .item-image {
    margin-right: $marginSize;
    box-sizing: border-box;
    width: $height;
    height: 100%;
    flex: 0 0 auto;
    img {
      display: block;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .item-content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    .item-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: $marginSize / 2;
    }
    .item-info {
      display: flex;
      align-items: center;
      color: var.$gray;
      font-size: 12px;

      span {
        margin-right: 5px;
      }
      margin-bottom: $marginSize;
    }
    .item-description {
      color: var.$words;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      line-clamp: 5;
    }
  }
}
</style>
