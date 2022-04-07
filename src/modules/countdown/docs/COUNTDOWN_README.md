# Countdown Widget

This widget displays a simple countdown. The remaining time can be displayed in 4 different formats, for example:

  - Days
  - Hours
  - Days + Hours
  - Full time (Days Hours:Minutes:Seconds)

To configure the target date the user is presented with a form where he can enter the name of the event, the date, and format to display the remaining time.

As with every widget, the user has the option to remove it from her start page.

## Widget UI

## Widget Config UI

## Data Storage

```jsonc
{
  "countdown": {
    "enabled": true,  // In case the user cancels the subscription and doesn't have access to premium widgets anymore, we display them as disabled.
    "events": [
      {
        "name": "",
        "date": "",
        "config": {
          "displayFormat": ""
        }
      }
    ]
  }
}
```

## Notes / Questions

  - Do we need a date and time picker?
  - Dayjs?
  - Should we set a limit of countdown widgets for the start page?
  - Validate the form with formik
