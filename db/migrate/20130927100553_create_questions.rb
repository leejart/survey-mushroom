class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string  :question
      t.integer  :survey_id

      t.timestamps
    end
  end
end
