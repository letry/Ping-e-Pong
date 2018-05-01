<script>
export default {
  name: 'playerSettings',
  props: {
      speed: Number,
      width: Number,
      wall: Number
  },
  data: () => ({

  })
}
</script>

<template>
    <div class="startButtons">
       <img src="img/interface/arrows.png">
        <div class="player 1">
            <div class="info">Игрок 1</div>
            <div class="info countPoint">3</div>
            
            <div class="speedlbl intface"></div>
            <input type="number" min="1" max="3" class="speed" value="1">
            
            <div class="widthlbl intface"></div>
            <input type="number" min="1" max="3" class="widthShield" value="1">
            
            <div class="walllbl intface"></div>
            <input type="number" min="1" max="3" class="HP" value="1">
            
            <button>Готов</button>
        </div>
        
    </div>
</template>

<style>
    .startButtons{
        display: none;
        font-size: 25px;
        max-width: 200px
    }
    .startButtons input{
        float: left;
        font-size: 25px;
        width: 82%;
    }
    .startButtons input[type="button"]{
        width: 100%;
    }
    .startButtons > img {
        width: 50%;
        margin: 0 auto;
        display: block;
    }
    .speedlbl {
        background: url(img/interface/Ispeed.png), rgba(70,255,255,0.9);
        background-size: cover;
        background-repeat: round;
    }
    .widthlbl {
        background: url(img/interface/Iwidth.png), rgba(70,255,255,0.9);
        background-size: cover;
        background-repeat: round;
    }
    .walllbl {
        background: url(img/interface/Iwall.png), rgba(70,255,255,0.9);
        background-size: cover;
        background-repeat: round;
    }
</style>
