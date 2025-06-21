/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    // Active navigation highlighting
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        // Check each section in reverse order
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('header a.active').removeClass('active');
                $('header a').eq(i).addClass('active');
            }
        });
    }).scroll();

    // Animate skill bars when in viewport
    function animateSkillBars() {
        $('.skill-bar').each(function() {
            var $this = $(this);
            var width = $this.css('width');
            
            if ($this.is(':in-viewport')) {
                $this.css('width', '0%').animate({
                    width: width
                }, 1500);
            }
        });
    }

    // Check if element is in viewport
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // Trigger skill bar animation on scroll
    $(window).scroll(function() {
        if ($('.skill-bar').isInViewport()) {
            animateSkillBars();
        }
    });

    // Smooth reveal animations for sections
    function revealOnScroll() {
        var scrolled = $(window).scrollTop();
        var win_height_padded = $(window).height() * 0.8;

        $(".reveal:not(.animated)").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('timeout')) {
                    window.setTimeout(function() {
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'), 10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
    }

    // Add reveal class to sections
    $('.project, .education-block, .skill-item').addClass('reveal').attr('data-animation', 'fadeInUp');

    // Trigger reveal animations
    $(window).scroll(function() {
        revealOnScroll();
    });

    // Initialize reveal on page load
    revealOnScroll();

    // Enhanced form validation and feedback
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        
        var $form = $(this);
        var $button = $form.find('button');
        var originalText = $button.text();
        
        // Show loading state
        $button.text('Sending...').prop('disabled', true);
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(function() {
            $button.text('Message Sent!').addClass('success');
            
            // Reset form
            $form[0].reset();
            
            // Reset button after 3 seconds
            setTimeout(function() {
                $button.text(originalText).prop('disabled', false).removeClass('success');
            }, 3000);
        }, 2000);
    });

    // Add hover effects to project cards
    $('.project').hover(
        function() {
            $(this).find('.project-info').css('transform', 'translateY(-50%) scale(1.02)');
        },
        function() {
            $(this).find('.project-info').css('transform', 'translateY(-50%) scale(1)');
        }
    );

    // Parallax effect for lead section
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var parallax = $('.parallax');
        var speed = 0.5;
        
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });

    // Add parallax class to lead overlay
    $('#lead-overlay').addClass('parallax');

    // Typing effect for lead subtitle
    function typeWriter(element, text, speed = 100) {
        var i = 0;
        element.html('');
        
        function type() {
            if (i < text.length) {
                element.html(element.html() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect when page loads
    $(document).ready(function() {
        var subtitle = $('.lead-subtitle');
        var originalText = subtitle.text();
        
        // Start typing effect after a short delay
        setTimeout(function() {
            typeWriter(subtitle, originalText, 50);
        }, 1000);
    });

})(jQuery);
