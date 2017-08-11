class CreateAssemblies < ActiveRecord::Migration[5.0]
  def change
    create_table :assemblies do |t|
      t.string :kennung
      t.integer :kanaele
      t.string :artikelnr
      t.text :bezeichnung
      t.float :brutto
      t.float :rabatt

      t.timestamps
    end
  end
end
