document.addEventListener("DOMContentLoaded", () => {
    const clockElement = document.getElementById("clock");
    const timeFormatSwitch = document.getElementById("timeFormatSwitch");
    const colorPicker = document.getElementById("colorPicker");
    const fontSizeRange = document.getElementById("fontSizeRange");
    const alarmHourSelect = document.getElementById("alarmHour");
    const alarmMinuteSelect = document.getElementById("alarmMinute");
    const alarmAmPmSelect = document.getElementById("alarmAmPm");
    const setAlarmBtn = document.getElementById("setAlarmBtn");
    const clearAlarmBtn = document.getElementById("clearAlarmBtn");
    const alarmStatus = document.getElementById("alarmStatus");
  
    let alarmTime = null;
  
    /**
     * Gets the current time in Mountain Standard Time (MST/MDT).
     */
    function getMSTTime() {
      const now = new Date();
      
      // Get time in Mountain Time (Denver Time Zone)
      const options = {
        timeZone: "America/Denver",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: timeFormatSwitch.checked, // 12-hour or 24-hour format
      };
  
      return now.toLocaleTimeString("en-US", options);
    }
  
    /**
     * Updates the clock display with the MST time.
     */
    function updateClock() {
      const mstTime = getMSTTime();
      clockElement.textContent = mstTime;
  
      // Check alarm
      if (alarmTime && mstTime.startsWith(alarmTime)) {
        alert("⏰ Alarm ringing!");
        alarmStatus.textContent = "Alarm is ringing!";
        clearAlarm();
      }
    }
  
    /* === Update the clock every second === */
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to avoid delay
  
    /* === Handle format, color, and font size preferences === */
    timeFormatSwitch.addEventListener("change", () => {
      localStorage.setItem("timeFormat", timeFormatSwitch.checked ? "12" : "24");
      updateClock(); // Update instantly
    });
  
    colorPicker.addEventListener("input", () => {
      clockElement.style.color = colorPicker.value;
      localStorage.setItem("clockColor", colorPicker.value);
    });
  
    fontSizeRange.addEventListener("input", () => {
      clockElement.style.fontSize = fontSizeRange.value + "px";
      localStorage.setItem("fontSize", fontSizeRange.value);
    });
  
    /* === Alarm Functions === */
    function setAlarm() {
      alarmTime = `${alarmHourSelect.value.padStart(2, "0")}:${alarmMinuteSelect.value}`;
      if (timeFormatSwitch.checked) {
        alarmTime += ` ${alarmAmPmSelect.value}`;
      }
      alarmStatus.textContent = `🔔 Alarm set for ${alarmTime} MST`;
      localStorage.setItem("alarmTime", alarmTime);
    }
  
    function clearAlarm() {
      alarmTime = null;
      alarmStatus.textContent = "No alarm set";
      localStorage.removeItem("alarmTime");
    }
  
    setAlarmBtn.addEventListener("click", setAlarm);
    clearAlarmBtn.addEventListener("click", clearAlarm);
  });
  