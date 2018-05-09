<script>
export default {
  name: 'playerSettings',
  props: {
      isReady: Boolean,      
      points: Number,
      speed: {
        type: Number,
        default: 1
      },
      length: {
        type: Number,
        default: 1
      },
      wall: {
        type: Number,
        default: 1
      },
      index: Number
  },
  computed: {
      residuePoints() {
          return this.points - this.speed - this.length - this.wall;
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
        <header>Игрок {{index + 1}}<br>{{!index ? 'WASD' : '↑↓→←'}}</header>
        <div class="interfaceWrapper">
            <span>{{residuePoints}}</span>
            
            <div>
                <img src="../img/interface/Ispeed.png">
                <input type="number"
                    :disabled="isReady"
                    min="1" 
                    :max="getMax(speed)" 
                    :value="speed"
                    @change="$emit('update:speed', +$event.target.value)">
            </div>
            
            <div>
                <img src="../img/interface/Iwidth.png">
                <input type="number"
                    :disabled="isReady"
                    min="1"
                    :max="getMax(length)"
                    :value="length" 
                    @change="$emit('update:length', +$event.target.value)">
            </div>
            
            <div>
                <img src="../img/interface/Iwall.png">
                <input type="number" 
                    :disabled="isReady"
                    min="1" 
                    :max="getMax(wall)"
                    :value="wall" 
                    @change="$emit('update:wall', +$event.target.value)">
            </div>
        </div>
        <button :disabled="isReady" @click="$emit('update:is-ready', true)">
            Готов
        </button>
    </div>
</template>

<style>
    .startButtons {
        font-size: 25px;
        max-width: 200px;
        text-align: center;
    }
    .startButtons > * {
        padding: 8px;
        background: white;
    }
    .startButtons * {
        font-size: inherit;
    }
    .startButtons > div {
        background: #999999;        
    }
    .startButtons > button {
        width: 100%;
    }
    .interfaceWrapper > span {
        display: block;
        margin-bottom: 2%;
    }
    .interfaceWrapper > div {
        display: flex;        
    }
    .interfaceWrapper input {
        width: 65%;
        margin-left: 3%;        
    }
</style>