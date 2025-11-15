# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "pufferfish-portfolio-theme"
  spec.version       = "1.0.0"
  spec.authors       = ["Your Name"]
  spec.email         = ["your.email@example.com"]

  spec.summary       = "A modern, animated Jekyll portfolio theme with unique pufferfish cursor effect"
  spec.description   = "Pufferfish Portfolio Theme is a stunning Jekyll theme featuring a custom animated pufferfish cursor, smooth scroll animations, and a professional layout perfect for showcasing developer portfolios."
  spec.homepage      = "https://github.com/yourusername/pufferfish-portfolio-theme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.12"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.6"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.4"

  spec.add_development_dependency "bundler"
end
