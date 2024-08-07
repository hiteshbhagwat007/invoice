$(document).ready(function() {
    $('.btn-next').on('click', function() {
      var currentStep = $(this).closest('.step-content').data('step');
      var nextStep = currentStep + 1;
      navigateToStep(nextStep);
    });
  
    $('.btn-previous').on('click', function() {
      var currentStep = $(this).closest('.step-content').data('step');
      var previousStep = currentStep - 1;
      navigateToStep(previousStep);
    });
  
    function navigateToStep(step) {
      $('.step-content').removeClass('active').addClass('hidden');
      $('.step-content[data-step="' + step + '"]').removeClass('hidden').addClass('active');
      $('.step').removeClass('active');
      $('.step[data-step="' + step + '"]').addClass('active');
    }
  
    $('#add-service').on('click', function() {
      var newService = `
        <div class="service mb-4">
          <label class="block text-gray-700">Service Description</label>
          <input type="text" class="service-description w-full px-3 py-2 border" />
          <label class="block text-gray-700">Service Rate</label>
          <input type="number" class="service-rate w-full px-3 py-2 border" />
          <label class="block text-gray-700">Service Quantity</label>
          <input type="number" class="service-quantity w-full px-3 py-2 border" />
        </div>`;
      $('#services-container').append(newService);
    });
  });
  