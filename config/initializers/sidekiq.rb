Rails.application.reloader.to_prepare do
    sidekiq_config = YAML.load_file("#{Rails.root}/config/sidekiq.yml")
    redis_url = sidekiq_config[Rails.env]['url']
    redis_namespace = sidekiq_config[Rails.env]['namespace']
    
    Sidekiq.configure_server do |config|
        config.redis = { url: 'redis://localhost:6379/0'  }
        schedule_file = "config/schedule.yml"
    
        if File.exists?(schedule_file)
            Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
        end
    end
        
    Sidekiq.configure_client do |config|
        config.redis = { url: 'redis://localhost:6379/0'  }
    end
end
