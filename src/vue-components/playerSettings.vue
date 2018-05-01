<script>
export default {
  name: 'playerSettings',
  props: {
      points: Number,
      speed: {
        type: Number,
        default: 1
      },
      width: {
        type: Number,
        default: 1
      },
      wall: {
        type: Number,
        default: 1
      }
  },
  computed: {
      residuePoints() {
          return this.points - this.speed - this.width - this.wall;
      }
  },
  methods: {
      getMax(current) {
          return Math.min(3, current + this.residuePoints);
      }
  }
}
</script>

<template>
    <div class="startButtons">
        <!--<img src="img/interface/arrows.png">-->
        <div>
            <div class="info">Игрок 1</div>
            <div class="info countPoint">{{residuePoints}}</div>
            
            <div class="speedlbl intface"></div>
            <input type="number" 
                min="1" 
                :max="getMax(speed)" 
                :value="speed"
                @change="$emit('update:speed', +$event.target.value)">
            
            <div class="widthlbl intface"></div>
            <input type="number" 
                min="1"
                :max="getMax(width)"
                :value="width" 
                @change="$emit('update:width', +$event.target.value)">
            
            <div class="walllbl intface"></div>
            <input type="number" 
                min="1" 
                :max="getMax(wall)"
                :value="wall" 
                @change="$emit('update:wall', +$event.target.value)" >
            
            <button>Готов</button>
        </div>
    </div>
</template>

<style>
    .intface {
        width: 18%;
        float: left;
    }
    .startButtons{
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
    /*.speedlbl {
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
    }*/
</style>
