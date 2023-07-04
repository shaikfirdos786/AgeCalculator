function calculateDuration(startDate, endDate) {
  let yearsDiff = endDate.getFullYear() - startDate.getFullYear();
  let monthsDiff = endDate.getMonth() - startDate.getMonth();
  let daysDiff = endDate.getDate() - startDate.getDate();

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    yearsDiff--;
    monthsDiff += 12;
  }

  if (daysDiff < 0) {
    const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 0);
    daysDiff += lastMonth.getDate();
    monthsDiff--;
  }

  return {
    years: yearsDiff,
    months: monthsDiff,
    days: daysDiff
  };
}

$(document).ready(() => {
  $("button").click(() => {
    const bornDate = Number($(".date").val());
    const bornMonth = Number($(".month").val()) - 1; // Zero-indexed month
    const bornYear = Number($(".year").val());

    const warningMessage = $("#warningMessage");
    const warningMessage1 = $("#warningMessage1");
    const warningMessage2 = $("#warningMessage2");

    const dateBorder = $(".date");
    const monthBorder = $(".month");
    const yearBorder = $(".year");

    const startDate = new Date(bornYear, bornMonth, bornDate);
    const endDate = new Date(); // Current date

    if (
      isNaN(bornDate) ||
      isNaN(bornMonth) ||
      isNaN(bornYear) ||
      bornDate < 1 ||
      bornDate > 31 ||
      bornMonth < 0 ||
      bornMonth > 11 ||
      bornYear > endDate.getFullYear()
    ) {
      if (isNaN(bornDate) || bornDate < 1 || bornDate > 31) {
        warningMessage.css("display", "block");
        dateBorder.css("border-color", "red");
      } else {
        warningMessage.css("display", "none");
        dateBorder.css("border-color", "black");
      }

      if (isNaN(bornMonth) || bornMonth < 0 || bornMonth > 11) {
        warningMessage1.css("display", "block");
        monthBorder.css("border-color", "red");
      } else {
        warningMessage1.css("display", "none");
        monthBorder.css("border-color", "black");
      }

      if (isNaN(bornYear) || bornYear > endDate.getFullYear()) {
        warningMessage2.css("display", "block");
        yearBorder.css("border-color", "red");
      } else {
        warningMessage2.css("display", "none");
        yearBorder.css("border-color", "black");
      }

      $("#mainwarningMessage").css("display", "block");
    } else {
      $("#mainwarningMessage").css("display", "none");
      warningMessage.css("display", "none");
      warningMessage1.css("display", "none");
      warningMessage2.css("display", "none");
      dateBorder.css("border-color", "black");
      monthBorder.css("border-color", "black");
      yearBorder.css("border-color", "black");
      const currentAge = calculateDuration(startDate, endDate);
      $(".years").text(currentAge.years);
      $(".months").text(currentAge.months);
      $(".days").text(currentAge.days);
    }
  });
});
