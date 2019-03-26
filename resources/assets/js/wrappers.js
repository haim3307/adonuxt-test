! function (window,Vue,VeeValidate) {
    window.VeeValidateWrapper = function VeeValidateWrapper(options)
    {
        var self = this;

        self.dictionary = {
            en: {
                attributes: {
                    email:            'Email Address',
                    full_name:        'Full Name',
                    'password-again': 'password again'
                }
            }
        };

        self.init = function(options)
        {
            Vue.use(VeeValidate,{
                behavior: 'eager', // if the field has an error and the user just entered a valid value, remove the error
                statusEvents: {
                    'pristine': 'blur',
                    'invalid': 'change',
                    'valid': 'blur',
                    'required':'blur'
                }
            });

            VeeValidate.Validator.localize(self.dictionary);
        }
    };

    function VuePaginate(options)
    {
        var self = this;

        self.init = function(options)
        {
            Vue.component('paginate', VuejsPaginate);
        }

    }
    window.VuePaginate = VuePaginate;

}(window,Vue,VeeValidate);