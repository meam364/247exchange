/*! jquery.jelect.js v1.0.0 | felixexter | MIT License | https://github.com/CSSSR/jelect/ */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function ($) {

	'use strict';

	var
		Jelect,
		pluginName = 'jelect',
		_setValue,
		_getValues;

	$[pluginName] = {
		version: '1.0.0',
		options: {
			classes: {
				autocomplete: pluginName + '_type_autocomplete',
				containerActive: pluginName + '_state_active',
				containerDisabled: pluginName + '_state_disabled',
				currentActive: pluginName + '-current_state_active',
				optionsActive: pluginName + '-options_state_active',
				optionActive: pluginName + '-option_state_active',
				optionDisabled: pluginName + '-option_state_disabled',
				optionHide: pluginName + '-option_state_hide'
			},
			plugins: []
		},
		plugins: {},
		selectors: {
			container: '.js-' + pluginName,
			scroller: '.js-' + pluginName + '-scroller',
			input: '.js-' + pluginName + '-input',
			current: '.js-' + pluginName + '-current',
			options: '.js-' + pluginName + '-options',
			option: '.js-' + pluginName + '-option',
			optionValue: '.js-' + pluginName + '-option-value'
		},
		keyCode: {
			TAB: 9,
			BACKSPACE: 8,
			ENTER: 13,
			ESC: 27,
			DOWN: 40,
			UP: 38,
			HOME: 36,
			END: 35,
			PAGE_UP: 33,
			PAGE_DOWN: 34
		}
	};

	_setValue = function (value) {
		var _this = this,
			jelect = $[pluginName],
			selectors = jelect.selectors,
			classes = jelect.options.classes,
			$selectedOption = _this.$jelectOptions.find(selectors.option + '[data-val="' + value + '"]'),
			currentText = $selectedOption.find(selectors.optionValue).text();


		if ($selectedOption.hasClass(classes.optionDisabled)) {
			console.error('Option {' + value + '} is disabled');
			return false;
		}

		$selectedOption
			.addClass(classes.optionActive)
			.siblings(selectors.option)
			.removeClass(classes.optionActive);

		_this.$jelect
			.val(value)
			.removeClass(classes.containerActive)
			.trigger('jelect.change');


		if (_this.autocomplete) {
			_this.$jelectCurrent.val(value);
		} else {
			// Set a current text
			_this.$jelectCurrent
				.text(currentText)
				.attr('data-val', value);

			// Change the value of input and fire trigger `change`
			_this.$jelectInput
				.val(value)
				.attr('value', value)
				.trigger('change');
		}

		_this.trigger('change');
	};

	_getValues = function () {

		var _this = this,
			selectors = $[pluginName].selectors,
			values = [];

		_this.$jelectOptions
			.find(selectors.option)
			.each(function (i, option) {

				var $option = $(option);

				values.push({
					index: i,
					value: $option.data('val')
				});
			});

		return values;
	};

	Jelect = function ($jelect, options) {

		var
			defaults = $[pluginName],
			selectors = defaults.selectors,
			classes = defaults.options.classes,
			jelect = {
				$jelect: $jelect,
				$jelectCurrent: $jelect.find(selectors.current),
				$jelectOptions: $jelect.find(selectors.options),
				$jelectInput: $jelect.find(selectors.input),
				autocomplete: $jelect.hasClass(classes.autocomplete),
				options: $.extend(true, {}, defaults.options, options || {})
			};
		$.extend(true, this, jelect);

		this.init();
	};

	Jelect.prototype.init = function () {
		var
			_this = this,
			jelect = $[pluginName],
			selectors = jelect.selectors,
			classes = _this.options.classes,
			initVal = _this.$jelectOptions.find(selectors.option).not('.' + classes.optionDisabled).data('val');

		_this.trigger('init');

		// store data
		_this.values = _this.serialize();

		// Set init value
		_this.$jelect.val(initVal);

		// Open a dropdown
		_this.$jelectCurrent.on('click ' + pluginName + '.clickCurrent', function () {
			var
				// Select all active containers without current
				$container = $(selectors.container).filter('.' + classes.containerActive).not(_this.$jelect),

				// Select all active options container without current
				$options = $(selectors.options).filter('.' + classes.optionsActive).not(_this.$jelectOptions),

				$scroller = _this.$jelect.find(selectors.scroller),

				$activeOption,

				scrollValue = $scroller.scrollTop(),

				isDisabled = _this.$jelect.hasClass(classes.containerDisabled),

				canRunTrigger = (
					!_this.$jelect.hasClass(classes.containerActive) &&
					!_this.$jelectOptions.hasClass(classes.optionsActive)
				);

			if (isDisabled) {
				return false;
			}

			if (canRunTrigger) {
				_this.trigger('beforeOpen');
			}

			// Close all without current
			if ($container.length && $options.length) {
				$container.removeClass(classes.containerActive);
				$options.removeClass(classes.optionsActive);
			}

			// Open or close current
			_this.$jelect.toggleClass(classes.containerActive);
			_this.$jelectOptions.toggleClass(classes.optionsActive);

			if (_this.$jelect.hasClass(classes.containerActive)) {
				$activeOption = _this.$jelectOptions.find('.' + classes.optionActive);
				scrollValue = $scroller.scrollTop();
				$scroller.scrollTop(scrollValue + $activeOption.position().top);
			}

			if (_this.autocomplete) {
				_this.$jelectCurrent.trigger('keyup');
			}

			if (canRunTrigger) {
				_this.$jelectCurrent.trigger('focus');

				_this.trigger('afterOpen');
			}
		});

		// Select an option
		_this.$jelectOptions.on('click ' + pluginName + '.changeOption', selectors.option, function () {

			var $this = $(this),
				value = $this.data('val');

			if ($this.hasClass(classes.optionDisabled)) {
				return false;
			}

			_setValue.call(_this, value);
			_this.$jelectOptions.removeClass(classes.optionsActive);
		});

		if (_this.autocomplete) {
			_this.$jelectCurrent.on('keyup', function (event) {

				var $input = $(this),
					keyCode = jelect.keyCode,
					eventKeyCode = event.keyCode,
					char = String.fromCharCode(eventKeyCode),
					pattern = /[a-zA-Zа-яА-ЯЁё0-9]/,
					value = $input.val(),
					$options = _this.$jelectOptions.find(selectors.option),
					$scroller = _this.$jelect.find(selectors.scroller),
					filteredOptions = $.grep(_this.values, function (option) {
						return option.value.indexOf(value) === -1;
					});

				if (!pattern.test(char) && eventKeyCode !== keyCode.BACKSPACE) {
					return;
				}

				if (!_this.$jelect.hasClass(classes.containerActive)) {
					_this.$jelectCurrent.trigger('click');
				}

				$options.removeClass(classes.optionHide);

				$.each(filteredOptions, function (i, option) {
					var value = option.value;
					$options
						.filter('[data-val="' + value + '"]')
						.addClass(classes.optionHide);
				});

				$options
					.filter(':visible')
					.removeClass(classes.optionActive)
					.first()
					.addClass(classes.optionActive);

				$scroller.scrollTop(0);

			});
		}

	};

	Jelect.prototype.trigger = function (trigger) {
		var _this = this;

		$.each(_this.options.plugins || [], function (i, plugin) {
			plugin = $[pluginName].plugins[plugin];

			if (plugin && plugin[trigger]) {
				plugin[trigger]({
					$jelect: _this.$jelect,
					$jelectCurrent: _this.$jelectCurrent,
					$jelectOptions: _this.$jelectOptions,
					$jelectInput: _this.$jelectInput,
					options: _this.options,
					text: _this.text(),
					val: _this.val()
				});
			}
		});
	};

	Jelect.prototype.text = function () {
		return this.$jelectCurrent.text().trim();
	};

	Jelect.prototype.val = function () {
		return this.$jelect.val();
	};

	Jelect.prototype.setValue = function (value) {
		if (typeof value !== 'undefined') {
			_setValue.call(this, value);
		}
		return this;
	};

	Jelect.prototype.addValue = function (value, title, index) {
		var _this = this,
			jelect = $[pluginName],
			selectors = jelect.selectors,
			classes = jelect.options.classes,
			$options = _this.$jelectOptions.find(selectors.option),
			countOptions = $options.length - 1,
			position = (index === null || index === undefined) ? countOptions + 1 : index,
			$option = null,
			$newOption = null;

		if (position > $options.length) {
			position = countOptions + 1
		} else if (position < 0) {
			position = 0;
		}
		if (position === 0) {
			$option = $options.first();
		} else if (position > 0 && position <= countOptions) {
			$option = $options.eq(position);
		} else {
			$option = $options.last();
		}

		$newOption = $option.clone();

		$newOption
			.removeClass(classes.optionDisabled)
			.removeClass(classes.optionActive)
			.removeClass(classes.optionHide)
			.attr('data-val', value)
			.find(selectors.optionValue)
			.html(title.trim());

		if (position <= countOptions) {
			$option.before($newOption);
		} else {
			$option.after($newOption);
		}

		_this.values.push({
			index: _this.values.length,
			value: value
		});

	}

	Jelect.prototype.serialize = function () {
		return _getValues.call(this);
	};

	Jelect.prototype.disable = function (value) {
		var _this = this,
			jelect = $[pluginName],
			selectors = jelect.selectors,
			classes = jelect.options.classes,
			$option = _this.$jelectOptions
						.find(selectors.option + '[data-val="' + value + '"]'),
			isEnabled = !$option.hasClass(classes.optionDisabled);

		if (typeof value !== 'undefined') {
			if (isEnabled) {
				$option.addClass(classes.optionDisabled);
				// if lockable options is selected
				// then select of the first unlocked option
				if (_this.$jelectCurrent.data('val') === value) {
					var $firstEnableOption = _this.$jelectOptions
												.find(selectors.option)
												.not('.' + classes.optionDisabled)
												.first();
					_this.setValue($firstEnableOption.data('val'));
				}
			}
		} else {
			_this.$jelect.addClass(classes.containerDisabled);
			_this.$jelectInput.attr('disabled', true);
		}
		return this;
	};

	Jelect.prototype.enable = function (value) {
		var _this = this,
			jelect = $[pluginName],
			selectors = jelect.selectors,
			classes = jelect.options.classes,
			$option = _this.$jelectOptions
						.find(selectors.option + '[data-val="' + value + '"]'),
			isDisabled = $option.hasClass(classes.optionDisabled);

		if (typeof value !== 'undefined' && isDisabled) {
			if (isDisabled) {
				$option = _this.$jelectOptions
							.find(selectors.option + '[data-val="' + value + '"]'),
				$option.removeClass(classes.optionDisabled);
			}
		} else {
			_this.$jelect.removeClass(classes.containerDisabled);
			_this.$jelectInput.attr('disabled', false);
		}
		return this;
	};

	// Hide dropdowns when click outside
	$(window.document)
		.on('click ' + pluginName + '.clickOutside', function (event) {
			var
				jelect = $[pluginName],
				selectors = jelect.selectors,
				jelectData,
				classes,
				$target = $(event.target),
				$options = $(selectors.options);

			if (
				!$target.is(selectors.container) &&
				!$target.closest(selectors.container).length
			) {
				jelectData = $options.closest(selectors.container).data('jelect');

				if (!jelectData) {
					return;
				}

				classes = jelectData.options.classes;

				if ($options.hasClass(classes.optionsActive)) {
					$options
						.removeClass(classes.optionsActive)
						.closest(selectors.container)
						.removeClass(classes.containerActive);

					jelectData.trigger('clickOutside');
				}
			}
		})
		.on('keydown ' + pluginName + '.keydown', function (event) {
			var
				$target = $(event.target),
				jelect = $[pluginName],
				keyCode = jelect.keyCode,
				eventKeyCode = event.keyCode,
				selectors = jelect.selectors,
				jelectData,
				classes,
				scrollTop,
				optionPosition,
				optionsHeight,
				isOpen,
				optionsInPage,
				page,
				indexNextOption,
				$jelect,
				$scroller,
				$optionsContainer,
				$options,
				$activeOption,
				$nextOption;

			if ($target.is(selectors.current)) {
				jelectData = $target.closest(selectors.container).data(pluginName);
				classes = jelectData.options.classes;
				$jelect = $target.closest(selectors.container);
				$scroller = $jelect.find(selectors.scroller);
				$optionsContainer = $jelect.find(selectors.options);
				optionsHeight = $optionsContainer.outerHeight();
				$options = $jelect.find(selectors.option).not('.' + classes.optionHide);
				$activeOption = $options.filter('.' + classes.optionActive);

				isOpen = $jelect.hasClass(classes.containerActive);

				scrollTop = $scroller.scrollTop();

				switch (eventKeyCode) {

					case keyCode.TAB: {

						$jelect.removeClass(classes.containerActive);
						$optionsContainer.removeClass(classes.optionsActive);

						_setValue.call(jelectData, jelectData.val());

						break;
					}

					case keyCode.ENTER: {

						if ($jelect.hasClass(classes.containerActive)) {
							$activeOption.trigger(pluginName + '.changeOption');
						} else {
							$target.trigger('click');
						}

						event.preventDefault();

						break;
					}

					case keyCode.ESC: {

						if (!isOpen) {
							return;
						}

						$target.trigger('click');

						_setValue.call(jelectData, jelectData.val());

						event.preventDefault();

						break;
					}

					case keyCode.UP: {

						event.preventDefault();

						if (!isOpen) {
							$target.trigger('click');
							return;
						}

						var isFirst = $options.first().is($activeOption);

						$activeOption.removeClass(classes.optionActive);

						if (!isFirst) {
							$nextOption = $activeOption.prevAll(':visible').not('.' + classes.optionDisabled).first();
						} else {
							$nextOption = $options.last();
						}

						optionPosition = $nextOption.position().top;

						if (optionPosition < 0) {
							scrollTop += optionPosition;
						} else if (optionPosition > scrollTop + optionsHeight) {
							scrollTop = optionPosition;
						}

						break;
					}

					case keyCode.DOWN: {

						event.preventDefault();

						if (!isOpen) {
							$target.trigger('click');
							return;
						}

						var isLast = $options.last().is($activeOption);

						$activeOption.removeClass(classes.optionActive);

						if (!isLast) {
							$nextOption = $activeOption.nextAll(':visible').not('.' + classes.optionDisabled).first();
						} else {
							$nextOption = $options.first();
						}

						optionPosition = $nextOption.position().top;

						if (optionPosition >= optionsHeight) {
							scrollTop += optionPosition;
						} else if (optionPosition < 0) {
							scrollTop = optionPosition;
						}

						break;
					}

					case keyCode.HOME: {

						event.preventDefault();

						if (!isOpen) {
							return;
						}

						if ($activeOption.is($options.first())) {
							return;
						}

						$activeOption.removeClass(classes.optionActive);

						$nextOption = $options.first();

						scrollTop = $nextOption.position().top;

						break;
					}

					case keyCode.END: {

						event.preventDefault();

						if (!isOpen) {
							return;
						}

						if ($activeOption.is($options.last())) {
							return;
						}

						$activeOption.removeClass(classes.optionActive);

						$nextOption = $options.last();

						scrollTop = $nextOption.position().top;

						break;
					}

					case keyCode.PAGE_UP: {

						event.preventDefault();

						if (!isOpen) {
							return;
						}

						optionsInPage = Math.round(optionsHeight / $activeOption.outerHeight());
						page = Math.ceil(($activeOption.index() + 1) / optionsInPage) - 1;
						indexNextOption = page * optionsInPage - optionsInPage - 1;

						$activeOption.removeClass(classes.optionActive);

						if (indexNextOption < 0) {
							indexNextOption = 0;
						}
						if (
							indexNextOption === 0 &&
							$options.eq(indexNextOption).hasClass(classes.optionDisabled)
						) {
							$nextOption = $options
								.eq(indexNextOption)
								.nextAll(':visible')
								.not('.' + classes.optionDisabled)
								.first();
						} else {
							$nextOption = $options.eq(indexNextOption);
						}

						scrollTop += $nextOption.position().top;

						break;
					}

					case keyCode.PAGE_DOWN: {

						event.preventDefault();

						if (!isOpen) {
							return;
						}

						optionsInPage = Math.round(optionsHeight / $activeOption.outerHeight());
						page = Math.ceil(($activeOption.index() + 1) / optionsInPage) + 1;
						indexNextOption = page * optionsInPage - optionsInPage;

						$activeOption.removeClass(classes.optionActive);

						if (indexNextOption > $options.length) {
							indexNextOption = $options.length - 1;
						}

						if (indexNextOption === $options.length - 1) {
							$nextOption = $options.eq(indexNextOption);
						} else {
							$nextOption = $options
								.eq(indexNextOption)
								.nextAll(':visible')
								.not('.' + classes.optionDisabled)
								.first();
						}

						scrollTop += $nextOption.position().top;

						break;
					}

				}
				if ($nextOption) {
					$nextOption.addClass(classes.optionActive);
					$scroller.scrollTop(scrollTop);
				}

			} else if ($target.is(selectors.option)) {
				jelectData = $target.closest(selectors.container).data(pluginName);
				classes = jelectData.options.classes;

				if (eventKeyCode === keyCode.ENTER) {
					$target.trigger(pluginName + '.changeOption');
				}
			}
		});

	$.fn[pluginName] = function (options) {
		var
			_this = this,
			args = arguments;

		// Is the first parameter an object (options), or was omitted,
		// instantiate a new instance of the plugin.
		if (options === undefined || typeof options === 'object') {
			return _this.each(function (i, element) {

				// Only allow the plugin to be instantiated once,
				// so we check that the element has no plugin instantiation yet
				if (!$.data(element, pluginName)) {

					// if it has no instance, create a new one,
					// pass options to our plugin constructor,
					// and store the plugin instance
					// in the elements jQuery data object.
					$.data(element, pluginName, new Jelect($(element), options));
				}
			});

		// If the first parameter is a string and it doesn't start
		// with an underscore or "contains" the `init`-function,
		// treat this as a call to a public method.
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

			// Cache the method call
			// to make it possible
			// to return a value
			var returns;

			_this.each(function (i, element) {
				var instance = $.data(element, pluginName);

				// Tests that there's already a plugin-instance
				// and checks that the requested public method exists
				if (instance instanceof Jelect && typeof instance[options] === 'function') {

					// Call the method of our plugin instance,
					// and pass it the supplied arguments.
					returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}

				// Allow instances to be destroyed via the 'destroy' method
				if (options === 'destroy') {
					$.data(this, pluginName, null);
				}
			});

			// If the earlier cached method
			// gives a value back return the value,
			// otherwise return this to preserve chainability.
			return returns !== undefined ? returns : _this;
		}
	};

}));
