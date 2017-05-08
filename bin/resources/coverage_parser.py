#!/usr/bin/env python

import os
import sys
import subprocess
import json
import xml.etree.ElementTree as ET

from collections import OrderedDict

# About Clover TPC: https://confluence.atlassian.com/pages/viewpage.action?pageId=79986990

THRESHOLD = {
  'statements': 0.8,
  'conditionals': 0.7,
  'methods': 0.8,
  'overall': 0.8
}

PATH = '%s/coverage/clover.xml' % (os.getcwd())
ATTRIBUTES = ['statements', 'conditionals', 'methods', 'elements']

def echo(message=''):
  """Display standard output to bash/shell instead of python"""
  subprocess.Popen(['echo', message])
  return message

def from_pre_push(argv):
  return len(argv) >= 2 and argv[0] == '--from' and argv[1] == 'pre-push'

os.environ['PATH'] += ':/user/local/bin'
exit_code = 0

if not os.path.exists(PATH):
  sys.exit(1)

metrics = ET.parse(PATH).getroot()[0][0]
coverage = OrderedDict()

# parse clover.xml
for name in ATTRIBUTES:
  numerator = float(metrics.attrib['covered' + name])
  denominator = float(metrics.attrib[name])
  
  if name == 'elements':
    name = 'overall'

  try:
    coverage[name] = {
      'numeric': numerator/denominator,
      'string': '{:.2f}%'.format((numerator/denominator) * 100)
    }
  except ZeroDivisionError:
    coverage[name] = {
      'numeric': -1,
      'string': 'NaN'
    }
  finally:
    coverage[name]['passed'] = THRESHOLD[name] <= coverage[name]['numeric']

# display coverage report in table view
formatter = '{:>15}' * 4
thresholds = map(lambda x: 'NaN' if x == -1 else '{:.2f}%'.format(x * 100), THRESHOLD.values())
coverages = map(lambda x: x['string'], coverage.values())
data = zip(thresholds, coverages)
result = ['', 'Clover Result:', formatter.format('', *['THRESHOLD', 'ACTUAL', ''])]
for key, row in zip(coverage.keys(), data):
  if coverage[key]['passed']:
    row += ('\t\033[0;32mPASSED\033[0m',)
  else:
    row += ('\t\033[0;31mFAILED\033[0m',)
    exit_code = 1
  info = formatter.format(key, *row)
  result.append(info)
result.append('')
echo('\n'.join(result))

if exit_code != 0:
  if from_pre_push(sys.argv[1:]):
    echo('---------- PRE-PUSH SCRIPT END ----------')
  sys.exit(exit_code)
