<script>
export default {
  name: 'settings',
  props: {
      width: Number,
      height: Number,
      theme: String,
      difficult: String,
      multiWall: Boolean,
      bonuses: Boolean,
  },
  data: () => ({
    themes: [{
        text: 'Упрощённая',
        value: 'easy'
    }, {
        text: 'Классическая',
        value: 'classic'
    }, {
        text: 'Анимированная',
        value: 'animate'
    }],
    difficults: [
        'Легко',
        'Нормально',
        'Сложно',
        'Хардкор'
    ]
  })
}
</script>

<template>
    <div class="settings">
        <fieldset>
            <legend>Настройки</legend>
            
            <div class="labelWrap">
            
                <div class="inputWrap">
                    <label for="tableWidth">Ширина поля</label>
                    <input :value="width"
                            @change="$emit('update:width', $event.target.value)" 
                            min="9" max="20" 
                            class="width"
                            id="tableWidth"
                            type="number">
                </div>
            
                <div class="inputWrap">
                    <label for="tableHeight">Высота поля</label>
                    <input :value="height" 
                            @change="$emit('update:height', $event.target.value)" 
                            min="8" max="20" 
                            class="height"
                            id="tableHeight"
                            type="number">
                </div>
                
                <div class="inputWrap">
                    <label>Тема</label>
                    <select :value="theme" @change="$emit('update:theme', $event.target.value)">
                        <option v-for="option of themes" :value="option.value" :key="option.value">
                            {{ option.text }}
                        </option>
                    </select>
                </div>
                
                <div class="inputWrap">
                    <label>Сложность</label>
                    <select :value="difficult" @change="$emit('update:difficult', $event.target.value)">
                        <option v-for="(text, index) in difficults" :value="index" :key="index">
                            {{ text }}
                        </option>
                    </select>
                </div>
                
                <div class="inputWrap">
                    <label>Мульти-стена</label>
                    <input type="checkbox" :checked="multiWall" @input="$emit('update:multiWall', !multiWall)">
                </div>
                
                <div class="inputWrap">
                    <label>Бонусы</label>
                    <input type="checkbox" :checked="bonuses" @input="$emit('update:bonuses', !bonuses)">
                </div>
                
                <button @click="$emit('start')">
                    Начать игру
                </button>           
            </div>
            
        </fieldset>
    </div>
</template>

<style>
    fieldset {
        max-width: 500px;
        margin: 1% auto;
        text-align: center;
    }
    .inputWrap {
        overflow: hidden;
        clear: both;
    }
    fieldset .inputWrap label {
        float: left;
    }
    .button {
        margin-top: 5%;
    }
    fieldset .inputWrap input, select {
        float: right;
        width: 150px;
    }
</style>
