var Autocomplete = function(options) {
    this.form_selector = options.form_selector;
    this.url = options.url || '/s/sg';
    this.delay = parseInt(options.delay || 800);
    this.minimum_length = parseInt(options.minimum_length || 3);
    this.form_elem = null;
    this.query_box = null;
};
Autocomplete.prototype.setup = function(hostname) {
    var self = this;
    this.form_elem = $(this.form_selector);
    this.query_box = this.form_elem.find('input[name=wd]');
    // Watch the input box.
    this.query_box.on('keyup', function(e) {
        var query = self.query_box.val();
        if(query.length < self.minimum_length) {
            return false;
        }
        last = e.timeStamp;
        // alert(self.delay);
        setTimeout(function(){
            if(last-e.timeStamp===0){
                // self.fetch(query)
                self.fetch_tmall(query);
            }
        },self.delay);
    });
    // On selecting a result, populate the search field.
    this.form_elem.on('click', '.ac-result', function(ev) {
        self.query_box.val($(this).text());
        $('.ac-results').remove();
        // self.form_elem.submit()
        return false;
    });
    this.form_elem.on('click', '#buttonforsearch_all', function(ev) {
        // self.query_box.val($(this).text())
        var open_=self.form_elem.attr('open_');
        if (typeof(open_) === 'undefined'){
            open_='tmall';
        }
        if (hostname === 'quan.tduoduo.com'){
            self.form_elem.attr('action','https://quan.tduoduo.com/so/'+open_);
        }else{
           // self.form_elem.attr('action','https://www.tduoduo.com/so/jd')
           // console.log(open_);
           self.form_elem.attr('action','https://www.mmqnr.com/so/'+open_);
        }
        self.form_elem.submit();
        return false;
    });
};
Autocomplete.prototype.fetch = function(query) {
    var self = this;
    $.ajax({
        url: this.url,
        dataType:'json',
        data: {
            'q': query
        },
        success: function(data) {
            self.show_results(data);
        }
    });
};
Autocomplete.prototype.fetch_tmall = function(query) {
    var self = this;
    $.ajax({
        url: 'https://suggest.taobao.com/sug',
        dataType:'jsonp',
        data: {
            'q': query,
            'area':'tmall',
            'code':'utf-8'
        },
        success: function(data) {
            // var result = JSON.stringify(data); //json对象转成字符串
            self.show_results_tmall(data);
        },
        error:function(data){
            self.fetch(query);
        }
    });
};
Autocomplete.prototype.show_results = function(data) {
    // Remove any existing results.
    $('.ac-results').remove();
    var results = data.results || [];
    var results_wrapper = $('<div class="ac-results"></div>');
    var base_elem = $('<div class="result-wrapper"><a href="#" class="ac-result"></a></div>');
    if(results.length > 0) {
        for(var res_offset in results) {
            var elem = base_elem.clone();
            // Don’t use .html(...) here, as you open yourself to XSS.
            // Really, you should use some form of templating.
            elem.find('.ac-result').text(results[res_offset].term);
            results_wrapper.append(elem);
        }
    }
    else {
        // var elem = base_elem.clone()
        // elem.text("No results found.")
        // results_wrapper.append(elem)
    }
    this.query_box.after(results_wrapper);
};
Autocomplete.prototype.show_results_tmall = function(data) {
    // Remove any existing results.
    $('.ac-results').remove();
    var results = data.result || [];
    var results_wrapper = $('<div class="ac-results"></div>');
    var base_elem = $('<div class="result-wrapper"><a href="#" class="ac-result"></a></div>');
    if(results.length > 0) {
        for(var res_offset in results) {
            var elem = base_elem.clone();
            // Don’t use .html(...) here, as you open yourself to XSS.
            // Really, you should use some form of templating.
            elem.find('.ac-result').text(results[res_offset][0]);
            results_wrapper.append(elem);
        }
    }
    else {
        // var elem = base_elem.clone()
        // elem.text("No results found.")
        // results_wrapper.append(elem)
    }
    this.query_box.after(results_wrapper);
};