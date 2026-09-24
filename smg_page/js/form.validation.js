(function() {

    /*
     * -------------------------------------------------------
     *  FORM APP
     * -------------------------------------------------------
     */
    $('#formApp').validate({

        rules: {

            name: {
                required: true,
                minlength: 2,
                maxlength: 50
            },
            phone: {
                required: true
            }

        },

        messages: {

            name: {
                required: "Заполните это поле",
                minlength: "Заполните это поле",
                maxlength: "Заполните это поле"
            },

            phone: {
                required: "Заполните это поле"
            }

        },

        submitHandler: function(form) {

            $(form).ajaxSubmit({
                target: '#formAppTarget',
                success: function(data) {
				
					// Close current fancybox instance
					parent.jQuery.fancybox.getInstance().close();

                    swal({   
						title: "Спасибо",   						
						text: 'Ваша заявка принята',
						type: "success",
						timer: 5000,						
						showConfirmButton: false 
					});	

                    $("#formApp").clearForm();
                }
            });

        }

    });
	
	/*
     * -------------------------------------------------------
     *  FORM FAQ
     * -------------------------------------------------------
     */
    $('#formFaq').validate({

        rules: {
            
            faqPhone: {
                required: true
            }

        },

        messages: {
           
            faqPhone: {
                required: "Заполните это поле"
            }

        },

        submitHandler: function(form) {

            $(form).ajaxSubmit({
                target: '#formFaqTarget',
                success: function(data) {

                    swal({   
						title: "Спасибо",   						
						text: 'Ваша заявка принята',
						type: "success",
						timer: 5000,						
						showConfirmButton: false 
					});	

                    $("#formFaq").clearForm();
                }
            });

        }

    });


})();