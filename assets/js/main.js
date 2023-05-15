/**
* Template Name: Personal
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  /* on('click', '.mobile-nav-toggle', function(e) { */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bxl-list')
    this.classList.toggle('bxl-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()
      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bxl-list')
        navbarToggle.classList.toggle('bxl-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });



  /**
   * Portfolio Items Filter
   */
  window.addEventListener('load', () => {
    
    $(document).ready(function(){
      /* let portfolioFilters = select('#portfolio-filters li', true); */
      $("#portfolio-filters li").click(function(){
        var value = $(this).attr('data-filter');
        if(value == "all")
        {
            $('.portfolio-item').show('1000');
        }
        else
        {
            $('.portfolio-item').not('.' + value).hide('3000');
            $('.portfolio-item').filter('.' + value).show('3000');
        }
    }); /* Portfolio items click function */
   }); /* document Reay Function */
  }); /* End 'load' EventListener */


  /**
   * The function generates a random color in HSL format with customizable maximum and minimum values
   * for hue, saturation, and lightness.
   * @param [hueMaxVal=360] - The maximum value for the hue component of the generated color. It
   * defaults to 360, which is the maximum value for the hue in the HSL color model (where hue values
   * range from 0 to 360 degrees).
   * @param [hueMinVal=0] - The minimum value for the hue component of the generated color. It is set
   * to 0 by default, which corresponds to the color red in the HSL color model.
   * @param [saturationMaxVal=100] - The maximum value for the saturation of the generated color, which
   * is a number between 0 and 100.
   * @param [saturationMinVal=0] - The minimum value for the saturation parameter in the HSL color
   * model. It determines how intense or muted the color will be. A lower value will result in a more
   * muted or grayish color, while a higher value will result in a more vibrant color.
   * @param [lightnessMaxVal=100] - The maximum value for the lightness component of the generated
   * color in the HSL color model. It determines how bright or dark the color can be.
   * @param [lightnessMinVal=0] - The minimum value for the lightness parameter in the HSL color model.
   * It determines the brightness of the color, with 0% being completely black and 100% being
   * completely white.
   * @returns a randomly generated color in HSL format.
   */
  function generateRandomColor(hueMaxVal=360,hueMinVal=0,saturationMaxVal=100
          ,saturationMinVal=0,lightnessMaxVal=100,lightnessMinVal=0){
    
    var hue = Math.round(Math.random() * (hueMaxVal-hueMinVal) + hueMinVal); 
    var saturation = Math.round(Math.random() * (saturationMaxVal-saturationMinVal) + saturationMinVal); 
    var  lightness = Math.round(Math.random() * (lightnessMaxVal-lightnessMinVal) + lightnessMinVal); 
    
    var color = "hsl(" + hue.toString() + "," + saturation.toString() + "%," + lightness.toString()  +"%)"
    
    return color
  }

  let portfolioItems =  select('.portfolio-item',true);
  portfolioItems.forEach(function(item,i){
    item.setAttribute("style", "background: " + generateRandomColor(360,0,100,30,40,20))
  })
  let interestsIcons = select('.interest-icon',true);
  interestsIcons.forEach(function(item,i){
    item.setAttribute("style", "color: " + generateRandomColor(360,0,100,80,80,40))
  })
  let skillsIcons = select('.skill-icon',true);
  skillsIcons.forEach(function(item,i){
    item.setAttribute("style", "color: " + generateRandomColor(360,0,100,60,60,40))
  })

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
/**
 * The function loads an HTML file and converts it to a PDF format.
 * @param filename - The name or path of the HTML file that needs to be downloaded.
 */
  function loadHTML2Download(filename){
    fetch(filename)
    .then(response=> response.text())
    .then(text=> htmlFile2pdf(text))
  }

/**
 * The function converts an HTML file to a PDF file using the html2pdf library with specified options.
 * @param element - The HTML element that needs to be converted to a PDF. This can be a DOM element or
 * a selector string that identifies the element.
 */
  function htmlFile2pdf(element) {
          const bodyEl = document.querySelector('body')
          const backgroundColor = window.getComputedStyle(bodyEl).backgroundColor
          var options = {            
            jsPDF: {
              format: 'a4',
              orientation: 'portrait',
              unit: 'mm',
            },
            html2canvas:  { 
              letterRendering: true, 
              useCORS: true,
              logging: true,
              backgroundColor: '#000000',
            },
            pagebreak: { mode: 'avoid-all', before: '#page2el' },
            margin: 5,
            image: {type: 'jpeg', quality: 1},
            filename: 'CV.pdf',
          };

          html2pdf().set(options).from(element).save();
  }

  /**
   * Download Resume Button
   */
  on('click', '#resume .download-resume', function(e) {
    e.preventDefault()
    loadHTML2Download(document.querySelector('button.download-resume').getAttribute('url'));

  },false)

  /**
   * Send email form
  **/
  let form = document.getElementById("contact-form");
    
  async function handleSubmit(event) {
    event.preventDefault();
    /*Set Loading*/
    thisForm.querySelector('.loading').classList.add('d-block');
    thisForm.querySelector('.error-message').classList.remove('d-block');
    thisForm.querySelector('.sent-message').classList.remove('d-block');

    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            console.log("hasOwn" + data["errors"].map(error => error["message"]).join(", "))
            displayError(form, data["errors"].map(error => error["message"]).join(", "));
          } else {
            displayError(form,thisForm.querySelector('.error-message').getAttribute("default"))
            console.log("default")
          }
        })
      }
    }).catch(error => {
      displayError(form,error)
    });
  }
  form.addEventListener("submit", handleSubmit)

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }


})()