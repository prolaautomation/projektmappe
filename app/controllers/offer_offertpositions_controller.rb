class OfferOffertpositionsController < ApplicationController
  # Preise zu gespeicherter Offerte bearbeiten
  # GET /offers/:offer_id/offer_offertpositions
  def index
    @offer = Offer.find(params[:offer_id])
    @offer_offertpositions = @offer.offer_offertpositions
    @subsubproject = @offer.subsubproject
    @subproject = @subsubproject.subproject
    @project = @subproject.project
  end

  # Preise zu gespeicherter Offerte speichern
  # PUT /offers/:offer_id/offer_offertpositions
  def update
    @offer_offertposition = OfferOffertposition.find(params[:id])
    @offer = Offer.find(@offer_offertposition.offer_id)
    subsubproject = @offer.subsubproject
    subproject = subsubproject.subproject
    project = subproject.project
    if @offer_offertposition.update(offer_offertposition_params)
      redirect_to offerte_path(:project_id => project.id,
                               :subproject_id => subproject.id,
                               :subsubproject_id => subsubproject.id), :notice => 'Preise erfolgreich aktualisiert.'
    else
      render 'edit'
    end
  end

  private
  # defines which parameters have to be provided by the form
  def offer_offertposition_params
    params.require(:offer_offertposition).permit!
  end
end
