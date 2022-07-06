{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    # nativeBuildInputs is usually what you want -- tools you need to run
    nativeBuildInputs = with pkgs; [
      cargo
      rustc
      rustfmt
      clippy
      rust-analyzer
      cargo-watch

      # libs
      openssl
    ];
}
