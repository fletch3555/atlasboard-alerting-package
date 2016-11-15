Atlasboard alerting Package
=======================

## Installation

From the root directory of your **recently created wallboard**, you just need to type:

    git submodule add https://github.com/fletch3555/atlasboard-alerting-package.git packages/alerting

to import the package as **git submodule** and use any of the widgets and jobs in this package (check the example dashboard **alerting** to see how).

See also: [Package-Atlassian](https://bitbucket.org/atlassian/atlasboard/wiki/Package-Atlassian)

## Available Widgets

### PagerDuty Incident List
Shows a list of open incidents from [PagerDuty](http://pagerduty/com).

#### Configuration
```JSON
"pagerduty": {
}
```