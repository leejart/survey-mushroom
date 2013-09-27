class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.integer :survey_id
      t.integer :user_id
      t.boolean :completed

      t.timestamps 
    end
  end
end
