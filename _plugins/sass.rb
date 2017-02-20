require 'sass'

module Jekyll
  module Less

    class ScssFile < Jekyll::StaticFile
      attr_accessor :compress

      # Obtain destination path.
      # +dest+ is the String path to the destination dir
      #
      # Returns destination file path.
      def destination(dest)
        File.join(dest, @dir, @name.sub(/scss$/, 'css'))
      end

      # Convert the less file into a css file.
      # +dest+ is the String path to the destination dir
      def write(dest)
        dest_path = destination(dest)
        @@mtimes[path] = mtime

        FileUtils.mkdir_p(File.dirname(dest_path))
        begin
          engine = Sass::Engine.for_file(path,
                    :style => (compress ? :compressed : :expanded))
          content = engine.render
          File.open(dest_path, 'w') do |f|
            f.write(content)
          end
        rescue => e
          STDERR.puts "Sass Exception in file #{path}: #{e.message}"
        end
      end

    end

    class LessCssGenerator < Jekyll::Generator
      safe true

      # Jekyll will have already added the *.scss files as Jekyll::StaticFile
      # objects to the static_files array. Here we replace those with a
      # ScssFile object.
      def generate(site)
        site.static_files.clone.each do |sf|
          if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /\.scss$/
            site.static_files.delete(sf)
            name = File.basename(sf.path)
            destination = File.dirname(sf.path).sub(site.source, '')

            scss_file = ScssFile.new(site, site.source, destination, name)
            scss_file.compress = site.config['minify']
            site.static_files << scss_file
          end
        end
      end
    end

  end
end