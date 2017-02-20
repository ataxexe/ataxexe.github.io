require 'i18n'

module Jekyll

  class CategoryPage < Page

    def initialize(site, category, name, layout)
      @site = site
      @base = site.source
      @dir = I18n.transliterate(category).gsub(/\s/, '-').downcase
      @name = name

      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), layout)
      self.data['category'] = category
      self.data['title'] = site.config['post_categories'][category.downcase]['name']
    end

  end

  class CategoryPageGenerator < Generator
    safe true

    def generate(site)
      site.categories.keys.each do |category|
        site.pages << CategoryPage.new(site, category, 'index.html', 'category-index.html')
        site.pages << CategoryPage.new(site, category, 'feed.xml', 'category-feed.xml')
      end
    end
  end

  module CategoryFilter

    def category_slogan(category)
      site = @context.registers[:site]
      entry = site.config['post_categories'][category.downcase]
      entry['slogan'] or site.config['description']
    end

    # build the url for a given category
    def category_url(category)
      I18n.transliterate(category).gsub(/\s/, '-').downcase
    end

    # Gets the number of posts in the given category
    def post_count(category)
      @context.registers[:site].categories[category.downcase].size
    end

  end
  
end
I18n.enforce_available_locales = false
Liquid::Template.register_filter(Jekyll::CategoryFilter)
