class AddProjectToSubsystems < ActiveRecord::Migration[5.0]
  def change
    add_reference :subsystems, :project, index: true, foreign_key: true, null: false
  end
end
