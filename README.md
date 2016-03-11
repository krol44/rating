### start
```js
$('#rating').rating({
	title: ['Хуже не бывает', 'Ужасно', 'Очень плохо', 'Плохо', 'Более-менее', 'Нормально', 'Хорошо', 'Отлично', 'Великолепно', 'Шедевр!'],
	click: function(d) {
		console.log('click', d);
	},
	move: function(d) {
		console.log('move', d);
	},
	mouseOut: function(d) {
		console.log('mouseOut', d);
	},
	loaded: function(d) {
    	console.log('loaded', d);
    }
});
```

### setting
```js
quantity: 5,
half: 'yes',
starOn: '/external/img/star-on.png',
starOnSet: '/external/img/star-on-set.png',
starOff: '/external/img/star-off.png',
starHalf: '/external/img/star-half.png',
starHalfSet: '/external/img/star-half-set.png',
setScore: undefined,
lock: 'no',
title: ['Appalling', 'Horrible', 'Very Bad', 'Bad', 'Average', 'Fine', 'Good', 'Very Good', 'Great', 'Masterpiece!'],
click: function(){},
move: function(){},
mouseOut: function(){},
loaded: function(){}
```
