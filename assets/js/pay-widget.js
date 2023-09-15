function Gercpay() {
	const frameName = 'GercpayFrame';
	const formName  = 'GercpayForm';
}

// Check that the payment is made through the widget.
window.addEventListener(
	"load",
	function(event) {
		const $order_review = document.getElementById( "order_review" );
		// Using a prepared link from admin dashboard.
		if ($order_review) {
			$order_review.addEventListener(
				"submit",
				function (event) {
					const $payment_method_gercpay = document.getElementById( "payment_method_gercpay" );
					if ($payment_method_gercpay && $payment_method_gercpay.checked === true) {
						event.preventDefault();
						pay();
					}
				},
				false
			);
		} else {
			// Step-by-step ordering.
			pay();
		}
	}
);

Gercpay.prototype.build         = 1;
Gercpay.prototype.name          = 'WCPWidget';
Gercpay.prototype.defaultTarget = 'https://api.gercpay.com.ua/api';

Gercpay.prototype.run = function (options) {
	this.postFields = options;

	this.createContainer();
	this.createOverlay();
	this.createFrameWrapper();
	this.createFrame();
	this.createCloseButton();

	this.frame.contentWindow.focus();
};

Gercpay.prototype.closeit = function () {
	if (this.container && this.container.parentNode) {
		this.container.parentNode.removeChild( this.container );
		this.container = null;
	}
	// Remove WordPress elements by added jQuery blockUI module.
	removeElementsByClass( 'blockUI' );
	document.body.style.overflow = "visible";
};

Gercpay.prototype.createContainer = function () {
	const cont  = document.getElementById( 'wcp-container' );
	const style = document.getElementById( 'wcp-styles' );

	if ( ! style) {
		const cssLink = document.createElement( 'link' );
		cssLink.href  = assets_directory_uri + 'assets/css/pay-widget.css';
		cssLink.setAttribute( 'id', 'wcp-styles' );
		cssLink.type = 'text/css';
		cssLink.rel  = 'stylesheet';
		document.getElementsByTagName( 'head' )[0].appendChild( cssLink );
	}

	if (cont) {
		cont.parentNode.removeChild( cont );
	}
	this.container = document.createElement( 'div' );
	this.container.setAttribute( 'id', 'wcp-container' );
	this.container.classList.add( 'wcp-widget-container' );
	if (this.isMobile && this.isSafari) {
		this.container.classList.add( 'wcp-container-scroll-fix' );
	}
	document.body.appendChild( this.container );

	document.body.classList.add( 'wcp-widget-open' );
};

Gercpay.prototype.createOverlay = function () {
	this.overlay = document.createElement( 'div' );
	this.overlay.classList.add( 'wcp-widget-overlay' );
	this.overlay.classList.add( 'loader' );
	this.container.appendChild( this.overlay );
};

Gercpay.prototype.createFrameWrapper = function () {
	this.frameWrapper = document.createElement( 'div' );
	this.frameWrapper.setAttribute( 'name', 'wcp-frame-wrapper' );
	this.frameWrapper.setAttribute( 'id', 'wcp-frame-wrapper' );
	this.frameWrapper.classList.add( 'wcp-frame-wrapper' );
	this.container.appendChild( this.frameWrapper );
};

Gercpay.prototype.createFrame = function () {
	this.frame = document.createElement( 'iframe' );
	this.frame.setAttribute( 'name', this.name + 'Frame' );
	this.frame.setAttribute( 'src', this.defaultTarget );
	this.frame.setAttribute( 'allow', 'payment' );
	this.frame.setAttribute( 'allowpaymentrequest', 'true' );
	this.frame.setAttribute( 'frameborder', '0' );
	this.frame.classList.add( 'wcp-widget-frame' );
	if (this.isMobile && this.isSafari) {
		this.frame.classList.add( 'wcp-frame-scroll-fix' );
	}
	this.frameWrapper.appendChild( this.frame );
	this.submitData( 'frame' );

	const that = this;
	// Waiting for load iframe data and show loader.
	this.frame.addEventListener(
		"load",
		function (event) {
			that.frameWrapper.classList.add( 'wcp-frame-wrapper-show' );
		},
		true
	);
};

Gercpay.prototype.createCloseButton = function () {
	this.closeButton = document.createElement( 'button' );
	this.closeButton.setAttribute( 'name', 'wcp-close-button' );
	this.closeButton.setAttribute( 'id', 'wcp-close-button' );
	this.closeButton.setAttribute( 'type', 'button' );
	this.closeButton.setAttribute( 'data-dismiss', 'modal' );
	this.closeButton.classList.add( 'close' );
	this.closeButton.classList.add( 'wcp-close-btn' );
	this.closeButton.innerHTML = "×";
	this.frameWrapper.appendChild( this.closeButton );
	let that = this;
	window.addEventListener(
		"click",
		function (event) {
			if (event.target.id === 'wcp-close-button') {
				that.closeit();
			}
		}
	);
}

Gercpay.prototype.submitData = function () {
	var form = document.createElement( 'form' );
	var i, field, a, e, n;
	var body = document.getElementsByTagName( 'body' )[0];

	form.style.cssText = 'display: none;';
	form.setAttribute( 'name', this.name + 'Form' );
	form.setAttribute( 'action', this.defaultTarget );
	form.setAttribute( 'method', 'POST' );
	form.setAttribute( 'accept-charset', 'utf-8' );
	form.setAttribute( 'target', this.name + 'Frame' );

	i = document.createElement( 'input' );
	i.setAttribute( 'type', 'submit' );
	form.appendChild( i );

	for (field in this.postFields) {
		if (this.postFields.hasOwnProperty( field )) {
			if (this.postFields[field] instanceof Array) {
				n = 0;
				a = this.postFields[field];
				for (e in a) {
					if (a.hasOwnProperty( e )) {
						i = document.createElement( 'input' );
						i.setAttribute( 'type', 'text' );
						i.setAttribute( 'name', field + '[]' );
						i.setAttribute( 'value', a[e] );
						form.appendChild( i );
						n++;
					}
				}
			} else {
				i = document.createElement( 'input' );
				i.setAttribute( 'type', 'text' );
				i.setAttribute( 'name', field );
				i.setAttribute( 'value', this.postFields[field] );
				form.appendChild( i );
			}
		}
	}

	this.container.appendChild( form );
	form.submit();
};

Gercpay.prototype.submitForm = function (url, data) {
	var form = document.createElement( 'form' );
	var i, field, a, e, n;
	var body = document.getElementsByTagName( 'body' )[0];

	form.setAttribute( 'name', this.name + 'FreeForm' );
	form.setAttribute( 'action', url );
	form.setAttribute( 'method', 'POST' );
	form.setAttribute( 'accept-charset', 'UTF-8' );
	i = document.createElement( 'input' );
	i.setAttribute( 'type', 'submit' );
	form.appendChild( i );

	for (field in data) {
		if (data.hasOwnProperty( field )) {
			i = document.createElement( 'input' );
			i.setAttribute( 'type', 'text' );
			i.setAttribute( 'name', field );
			i.setAttribute( 'value', data[field] );
			form.appendChild( i );
		}
	}
	body.appendChild( form );

	form.submit();
};

function removeElementsByClass(className){
	var elements = document.getElementsByClassName( className );
	while (elements.length > 0) {
		elements[0].parentNode.removeChild( elements[0] );
	}
}
