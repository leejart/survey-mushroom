helpers do

  def update_sorting

    Survey.all.each do |survey|
      survey.questions.order("sort_order ASC").each_with_index do |q,i|
        q.sort_order = (i+1)*1000
        q.save
      end

      survey.questions.each do |question|
        question.choices.order("sort_order ASC").each_with_index do |c,i|
          c.sort_order = (i+1)*1000
          c.save
        end
      end

    end
  end

end
