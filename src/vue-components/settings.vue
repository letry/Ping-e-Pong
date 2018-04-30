<script>
export default {
  name: 'settings',
  props: {
      width: Number,
      height: Number,
      theme: Array,
      difficult: Array,
      multiWall: Boolean,
      bonuses: Boolean
  }
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
                    <select name="" id="theme">
                        <option value="easy">Упрощённая</option>
                        <option value="classic">Классическая</option>
                        <option value="animate">Анимированная</option>
                    </select>
                </div>
                
                <div class="inputWrap">
                    <label>Сложность</label>
                    <select id="difficult">
                        <option value="2">Нормально</option>
                        <option value="1">Легко</option>
                        <option value="3">Сложно</option>
                        <option value="4">Хардкор</option>
                    </select>
                </div>
                
                <div class="inputWrap">
                    <label>Мульти-стена</label>
                    <input type="checkbox" id="multiWall" value="1">
                </div>
                
                <div class="inputWrap">
                    <label>Бонусы</label>
                    <input type="checkbox" id="bonuses" value="1">
                </div>
                
                <input type="button" class="submit" value="Начать игру">
                
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
    .submit {
        margin-top: 5%;
    }
    fieldset .inputWrap input, select {
        float: right;
        width: 150px;
    }
</style>
