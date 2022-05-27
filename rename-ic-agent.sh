#!/bin/bash
echo Renaming target file...
mv rust/.cargo/mobile_app/target/universal/release/libic_agent_lib.a rust/.cargo/mobile_app/target/universal/release/ic_agent_lib.a
echo Renamed target file correctly