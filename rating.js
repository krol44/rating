// ver 0.4
// author krol44.com

(function($) {
	'use strict';

	var defaults = {
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
	};

	var methods = {
		init : function(options) {
			this.elm = $(this);
			this.opt = $.extend({}, defaults, options);
			this.arrayStar = [];

			this.elm.css('cursor', 'pointer');

			var titleTemp = [];
			$(this.opt.title).each(function(k, v) {
				titleTemp[k+1] = v;
			});
			this.opt.title = titleTemp;

			methods.setEvent.call(this);
		},

		setEvent : function() {
			var self = this;

			for (var i = 1; i < this.opt.quantity+1; i++) {
				var img = $('<img>').attr('src', this.opt.starOff).attr('rate', i).appendTo(this.elm);

				self.arrayStar.push(this.opt.starOff);

				img.on('mousemove', function (event) {
					if (self.opt.lock == 'yes') {
						return;
					}
					if ($(self).data('score')) {
						return;
					}

					methods.handlerMouse(self, event, this);

					self.opt.move({score:self.score, title: self.title});

				});
				img.on('mouseout', function(event) {
					methods.handlerMouse(self, event, this);

					self.opt.mouseOut({score: self.data('score'), title: self.opt.title[self.data('score')]});
				});

				img.on('click', function(event) {
					if (self.opt.lock == 'yes') {
						return;
					}
					if ($(self).data('score')) {
						return;
					}

					methods.handlerMouse(self, event, this);

					methods.save(self);

					self.opt.click({score: self.score, title: self.title});
				});


			}

			if(self.opt.setScore) {
				self.score = self.opt.setScore;
				methods.save(self);
				methods.handlerMouse(self, '', '');

				self.opt.loaded({score: self.score, title: self.opt.title[self.data('score')]});
			}

			if (self.opt.lock == 'yes') {
				self.elm.css('cursor', 'auto');
			}
		},

		handlerMouse : function(self, eventCallback, elementEvent) {
			var imgWidth = +$(elementEvent).width()/2;
			var rate = +$(elementEvent).attr('rate');
			var rateFull = +rate*2;
			var rateHalf = +rate*2-1;

			$(self.arrayStar).each(function(key, star) {
				var num = +key+1;

				if(num <= rate && (eventCallback.type === 'mousemove' || eventCallback.type === 'click')) {

					if(self.opt.half === 'yes' && num === +rate) {
						if(eventCallback.pageX-$(elementEvent).offset().left<=imgWidth) {
							self.arrayStar[key] = self.opt.starHalf;

							self.score = rateHalf;
							self.title = self.opt.title[rateHalf];
						} else {
							self.arrayStar[key] = self.opt.starOn;

							self.score = rateFull;
							self.title = self.opt.title[rateFull];

						}

					} else {

						self.score = rate;
						self.title = self.opt.title[rate];

						self.arrayStar[key] = self.opt.starOn;
					}

				} else {
					var scoreHalf = self.data('score');
					if(self.opt.half === 'yes') {
						scoreHalf = +self.data('score')/2;
					}

					if(num <= Math.ceil(scoreHalf)) {
						self.arrayStar[key] = self.opt.starHalfSet;
					}

					if(num <= scoreHalf) {
						self.arrayStar[key] = self.opt.starOnSet;
					}

					if(eventCallback.type === 'click') {
						self.arrayStar[key] = self.opt.starOff;
					}
				}

				if(!eventCallback || eventCallback.type === 'mouseout') {
					var score = self.data('score');
					if(self.opt.half === 'yes') {
						score = self.data('score')/2;
					}

					if(num <= Math.ceil(score)) {
						if(num <= score)
							self.arrayStar[key] = self.opt.starOn;

						if(num == Math.ceil(score) && score % 1 !== 0) {
							self.arrayStar[key] = self.opt.starHalf;
						}

					} else {
						self.arrayStar[key] = self.opt.starOff;
					}
				}
			});

			if(eventCallback.type === 'click') {
				methods.save(self);
			}

			methods.writeStar(self);
		},

		writeStar : function(self) {
			var elements = $(self.elm).children('img');
			$(self.arrayStar).each(function(k, v) {
				$(elements[k]).attr('src', v);
			});
		},

		save : function(self) {
			self.data('score', self.score);
		}

	};

	$.fn.rating = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist!');
		}

		return this;
	};

})(jQuery);