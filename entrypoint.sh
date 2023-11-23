#!/bin/bash
envsubst < env.template > env.js
exec "$@"
