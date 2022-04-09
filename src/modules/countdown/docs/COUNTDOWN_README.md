# Countdown Widget

This widget displays a simple countdown. The remaining time can be displayed in 2 different formats,
for example:

- Days
- Days + Hours

To configure the widget the user is presented with a form where he can enter the name of the event,
the date, and format to display the remaining time.

As with every widget, the user has the option to remove it from their start page. Since adding a new
one is very simple, there's no option to edit an existing countdown widget.

## Widget UI

The widget UI is very simple, displaying just the name of the event and the remaining time in the
specified format.

Storybook - Countdown Widget

## Widget Config UI

The configuration UI is a simple form with Formik to validate the input fields.

Storybook - Countdown Form

## Data Storage

```jsonc
{
  "type": "countdown",
  "enabled": true,
  "events": [
    {
      "name": "Event Name",
      "date": "2022-04-18T05:00:00.000Z",
      "format": "days", // The possible values for this field are: 'days' and 'days+hours'
      "id": "30223681-cc39-4056-be6f-671484a4cd70" // This is an auto-generated uuid
    }
  ]
}
```
