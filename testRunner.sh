#!/bin/bash

numberOfTrials=$1

for ((i=0; i<numberOfTrials; i++)); do
	open -a "Google Chrome" ./SpecRunner.html
done
