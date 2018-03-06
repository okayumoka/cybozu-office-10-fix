(function() {

	// run script in context of current page.
	function runPageScript(scriptStr) {
		var script = document.createElement("script");
		script.textContent = scriptStr;
		document.body.appendChild(script);
	}

	// check: is current page cybozu office 10?
	function isCybozuOffice10() {
		var script = `
			var input = document.createElement('input');
			input.id = '__cbex_value_iscb7__';
			input.name = '__cbex_value_iscb7__';
			input.type = 'hidden';
			input.value = window.CB7 == undefined ? '0' : '1';
			document.body.appendChild(input);
		`;
		runPageScript(script);
		var iscb7 = document.getElementById('__cbex_value_iscb7__');
		// console.log(iscb7);
		// console.log(iscb7.value);
		return iscb7 && iscb7.value == '1';
	};

	if (!isCybozuOffice10()) return;

	var script = `
		var _original_createResponseObject_ = YAHOO.util.Connect.createResponseObject;
		YAHOO.util.Connect.createResponseObject = function (a, h) {
			var res = _original_createResponseObject_.apply(YAHOO.util.Connect.createResponseObject, [a, h]);
			if (res.getResponseHeader) {
				if (res.getResponseHeader['x-cybozu-forward']) {
					res.getResponseHeader['X-Cybozu-Forward'] = res.getResponseHeader['x-cybozu-forward'];
					delete res.getResponseHeader['x-cybozu-forward'];
				}
				if (res.getResponseHeader['x-cybozu-error']) {
					res.getResponseHeader['X-Cybozu-Error'] = res.getResponseHeader['x-cybozu-error'];
					delete res.getResponseHeader['x-cybozu-error'];
				}
			}
			return res;
		};
	`;
	runPageScript(script);
})();
